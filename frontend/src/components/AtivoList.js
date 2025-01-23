import React, { useEffect, useState, useCallback } from "react";
import api from "../services/api";

const AtivoList = () => {
  const [ativos, setAtivos] = useState([]);
  const [filteredAtivos, setFilteredAtivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [viewingAtivo, setViewingAtivo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editingAtivo, setEditingAtivo] = useState(null);
  const [deletedAtivo, setDeletedAtivo] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [ativoToDelete, setAtivoToDelete] = useState(null);

  const loadAtivos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("ativos/");
      setAtivos(response.data);
      setFilteredAtivos(response.data);
    } catch (error) {
      console.error("Erro ao buscar ativos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAtivos();
  }, [loadAtivos]);

  useEffect(() => {
    const filtered = ativos.filter((ativo) => {
      const matchesSearch = Object.values(ativo).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );

      const matchesCategory =
        selectedCategory === "todos" || ativo.categoria === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredAtivos(filtered);
  }, [searchTerm, selectedCategory, ativos]);

  const handleSaveEdit = async () => {
    try {
      await api.put(`ativos/${editingAtivo.id}/`, editingAtivo);
      setEditMode(false);
      setEditingAtivo(null);
      loadAtivos();
    } catch (error) {
      console.error("Erro ao editar ativo:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`ativos/${ativoToDelete.id}/`);
      setDeletedAtivo(ativoToDelete);
      setAtivos(ativos.filter((a) => a.id !== ativoToDelete.id));
      setConfirmDelete(false);
    } catch (error) {
      console.error("Erro ao excluir ativo:", error);
    }
  };

  const handleUndoDelete = async () => {
    try {
      await api.post("ativos/", deletedAtivo);
      setDeletedAtivo(null);
      loadAtivos();
    } catch (error) {
      console.error("Erro ao desfazer exclusão:", error);
    }
  };

  const statusColors = {
    Operacional: "bg-success text-white",
    Estoque: "bg-warning text-dark",
    Reservado: "bg-secondary text-white",
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-light text-dark py-3 d-flex justify-content-between align-items-center">
          <h2 className="h4 fw-bold mb-0">Lista de Ativos</h2>
          <div className="d-flex gap-3">
            <input
              type="text"
              className="form-control"
              placeholder="Pesquisar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="todos">Todas as Categorias</option>
              <option value="Notebook">Notebook</option>
              <option value="Desktop">Desktop</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Monitor">Monitor</option>
            </select>
          </div>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0 align-middle">
                <thead>
                  <tr className="bg-light">
                    <th>Nome</th>
                    <th>Patrimônio</th>
                    <th>Categoria</th>
                    <th>Responsável</th>
                    <th>Setor</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAtivos.map((ativo) => (
                    <tr key={ativo.id}>
                      <td>{ativo.nome}</td>
                      <td>{ativo.codigo_patrimonio}</td>
                      <td>{ativo.categoria}</td>
                      <td>{ativo.responsavel}</td>
                      <td>{ativo.setor}</td>
                      <td>
                        <span
                          className={`badge ${statusColors[ativo.status] || "bg-light text-dark"}`}
                          style={{ padding: "10px 15px", borderRadius: "20px" }}
                        >
                          {ativo.status || "Não especificado"}
                        </span>
                      </td>
                      <td className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-info"
                          onClick={() => setViewingAtivo(ativo)}
                        >
                          Visualizar Detalhes
                        </button>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => {
                            setEditMode(true);
                            setEditingAtivo(ativo);
                          }}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            setConfirmDelete(true);
                            setAtivoToDelete(ativo);
                          }}
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Visualizar Detalhes */}
      {viewingAtivo && (
        <div className="modal fade show d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">Detalhes do Ativo</h5>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setViewingAtivo(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  {Object.entries(viewingAtivo)
                    .filter(([key]) => key !== "id" && typeof viewingAtivo[key] !== "boolean")
                    .map(([key, value]) => (
                      <div className="col-md-6 mb-3" key={key}>
                        <strong>{key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}:</strong> {value || "-"}
                      </div>
                    ))}
                  {/* Seção Segurança */}
                  <div className="col-12 mt-4">
                    <h5 className="fw-bold">Segurança</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {Object.entries(viewingAtivo)
                        .filter(([key]) => typeof viewingAtivo[key] === "boolean")
                        .map(([key, value]) => (
                          <span
                            key={key}
                            className={`badge ${value ? "bg-success" : "bg-secondary"} text-white`}
                            style={{ padding: "10px 15px", borderRadius: "20px" }}
                          >
                            {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setViewingAtivo(null)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Editar */}
      {editMode && editingAtivo && (
        <div className="modal fade show d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">Editar Ativo</h5>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setEditMode(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  {Object.keys(editingAtivo)
                    .filter((key) => key !== "id")
                    .map((key) => (
                      <div className="col-md-6 mb-3" key={key}>
                        <label className="form-label text-capitalize">
                          {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                        </label>
                        {key === "status" ? (
                          <select
                            className="form-select"
                            value={editingAtivo[key] || ""}
                            onChange={(e) =>
                              setEditingAtivo({ ...editingAtivo, [key]: e.target.value })
                            }
                          >
                            <option value="">Selecione o Status</option>
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                          </select>
                        ) : key === "localidade" ? (
                          <select
                            className="form-select"
                            value={editingAtivo[key] || ""}
                            onChange={(e) =>
                              setEditingAtivo({ ...editingAtivo, [key]: e.target.value })
                            }
                          >
                            <option value="">Selecione a Localidade</option>
                            <option value="LEVE SAUDE OPERADORA">LEVE SAUDE OPERADORA</option>
                            <option value="AGGILE CORRETORA">AGGILE CORRETORA</option>
                          </select>
                        ) : (
                          <input
                            type={key.toLowerCase().includes("data") ? "date" : "text"}
                            className="form-control"
                            value={editingAtivo[key] || ""}
                            onChange={(e) =>
                              setEditingAtivo({ ...editingAtivo, [key]: e.target.value })
                            }
                          />
                        )}
                      </div>
                    ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditMode(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-success" onClick={handleSaveEdit}>
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {confirmDelete && (
        <div className="modal fade show d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Confirmar Exclusão</h5>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setConfirmDelete(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Você tem certeza que deseja excluir o ativo <strong>{ativoToDelete?.nome}</strong>?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setConfirmDelete(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alerta para desfazer exclusão */}
      {deletedAtivo && (
        <div className="alert alert-warning d-flex justify-content-between align-items-center mt-3">
          <span>Ativo excluído. Deseja desfazer?</span>
          <button className="btn btn-sm btn-primary" onClick={handleUndoDelete}>
            Desfazer
          </button>
        </div>
      )}
    </div>
  );
};

export default AtivoList;

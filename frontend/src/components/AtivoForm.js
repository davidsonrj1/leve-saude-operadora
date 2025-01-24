import React, { useState } from "react";
import api from "../services/api";

const AtivoFormModal = () => {
    const [formData, setFormData] = useState({
        nome: "",
        codigo_patrimonio: "",
        categoria: "Notebook",
        localidade: "",
        setor: "",
        responsavel: "",
        status: "Ativo",
        data_ultima_avaliacao: "",
        data_proxima_avaliacao: "",
        modelo: "",
        marca: "",
        numero_serie: "",
        mac_address_ethernet: "",
        mac_address_wifi: "",
        ip_fixado: "",
        bitlocker: false,
        antivirus_licenca: "",
        antivirus_versao: "",
        bart_wazuh: false,
        chrome_enterprise: false,
        acesso_remoto_id: "",
        termo_custodia: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post("ativos/", formData)
            .then(() => {
                alert("Ativo adicionado com sucesso!");
                setFormData({
                    nome: "",
                    codigo_patrimonio: "",
                    categoria: "Notebook",
                    localidade: "",
                    setor: "",
                    responsavel: "",
                    status: "Ativo",
                    data_ultima_avaliacao: "",
                    data_proxima_avaliacao: "",
                    modelo: "",
                    marca: "",
                    numero_serie: "",
                    mac_address_ethernet: "",
                    mac_address_wifi: "",
                    ip_fixado: "",
                    bitlocker: false,
                    antivirus_licenca: "",
                    antivirus_versao: "",
                    bart_wazuh: false,
                    chrome_enterprise: false,
                    acesso_remoto_id: "",
                    termo_custodia: false,
                });
            })
            .catch(() => alert("Erro ao adicionar ativo. Verifique os dados."));
    };

    return (
        <div>
            {/* Botão para abrir o modal */}
            <button
                type="button"
                className="btn btn-primary rounded-circle position-fixed"
                style={{
                    bottom: "20px",
                    right: "20px",
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#451e44",
                    borderColor: "#000",
                }}
                data-bs-toggle="modal"
                data-bs-target="#ativoFormModal"
            >
                <span style={{ fontSize: "24px", color: "#fff", fontWeight: "bold" }}>+</span>
            </button>

            {/* Modal */}
            <div
                className="modal fade"
                id="ativoFormModal"
                tabIndex="-1"
                aria-labelledby="ativoFormModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ativoFormModalLabel">
                                Adicionar Novo Ativo!
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                {/* Linha 1 */}
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Nome do Ativo</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="nome"
                                            value={formData.nome}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Código de Patrimônio</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="codigo_patrimonio"
                                            value={formData.codigo_patrimonio}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Linha 2 */}
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Categoria</label>
                                        <select
                                            className="form-select"
                                            name="categoria"
                                            value={formData.categoria}
                                            onChange={handleChange}
                                        >
                                            <option value="Notebook">Notebook</option>
                                            <option value="Desktop">Desktop</option>
                                            <option value="Smartphone">Smartphone</option>
                                            <option value="Monitor">Monitor</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Localidade</label>
                                        <select
                                            className="form-select"
                                            name="localidade"
                                            value={formData.localidade}
                                            onChange={handleChange}
>
                                            <option value="">Selecione a Localidade</option>
                                            <option value="LEVE SAÚDE OPERADORA">LEVE SAÚDE OPERADORA</option>
                                            <option value="AGGILE CORRETORA">AGGILE CORRETORA</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Setor</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="setor"
                                            value={formData.setor}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Linha 3 */}
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Responsável</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="responsavel"
                                            value={formData.responsavel}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Status</label>
                                        <select
                                            className="form-select"
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                        >
                                            <option value="Ativo">Ativo</option>
                                            <option value="Inativo">Inativo</option>                                            
                                        </select>
                                    </div>
                                </div>

                                {/* Linha 4 */}
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Data da Última Avaliação</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="data_ultima_avaliacao"
                                            value={formData.data_ultima_avaliacao}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Data da Próxima Avaliação</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="data_proxima_avaliacao"
                                            value={formData.data_proxima_avaliacao}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Linha 5 */}
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Modelo</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="modelo"
                                            value={formData.modelo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Marca</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="marca"
                                            value={formData.marca}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Linha 6 */}
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Número de Série</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="numero_serie"
                                            value={formData.numero_serie}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">MAC Address Ethernet</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="mac_address_ethernet"
                                            value={formData.mac_address_ethernet}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Linha 7 */}
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">MAC Address Wifi</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="mac_address_wifi"
                                            value={formData.mac_address_wifi}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">IP Fixado</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="ip_fixado"
                                            value={formData.ip_fixado}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Linha 8 */}
                                <div className="row">
                                    <div className="col-md-6 form-check mb-3">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            name="bitlocker"
                                            checked={formData.bitlocker}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label">Bitlocker</label>
                                    </div>
                                    <div className="col-md-6 form-check mb-3">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            name="bart_wazuh"
                                            checked={formData.bart_wazuh}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label">Bart/Wazuh</label>
                                    </div>
                                </div>

                                {/* Linha 9 */}
                                <div className="row">
                                    <div className="col-md-6 form-check mb-3">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            name="chrome_enterprise"
                                            checked={formData.chrome_enterprise}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label">Chrome Enterprise</label>
                                    </div>
                                    <div className="col-md-6 form-check mb-3">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            name="termo_custodia"
                                            checked={formData.termo_custodia}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label">Termo de Custódia</label>
                                    </div>
                                </div>

                                {/* Linha 10 */}
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label">Acesso Remoto - ID</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="acesso_remoto_id"
                                            value={formData.acesso_remoto_id}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Botões */}
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-success me-2">
                                        Salvar
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AtivoFormModal;

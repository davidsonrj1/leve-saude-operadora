from django.db import models

class Ativo(models.Model):
    nome = models.CharField(max_length=200)
    codigo_patrimonio = models.CharField(max_length=50, unique=True)
    categoria = models.CharField(max_length=50, choices=[('Notebook', 'Notebook'), ('Desktop', 'Desktop')])
    localidade = models.CharField(max_length=100)
    setor = models.CharField(max_length=100)
    responsavel = models.CharField(max_length=100)
    status = models.CharField(max_length=50, choices=[('Ativo', 'Ativo'), ('Inativo', 'Inativo')])
    data_ultima_avaliacao = models.DateField()
    data_proxima_avaliacao = models.DateField()
    modelo = models.CharField(max_length=100)
    marca = models.CharField(max_length=100)
    numero_serie = models.CharField(max_length=100)
    mac_address_ethernet = models.CharField(max_length=17, blank=True)
    mac_address_wifi = models.CharField(max_length=17, blank=True)
    ip_fixado = models.GenericIPAddressField(blank=True, null=True)
    bitlocker = models.BooleanField(default=False)
    antivirus_licenca = models.CharField(max_length=100, blank=True)
    antivirus_versao = models.CharField(max_length=50, blank=True)
    bart_wazuh = models.BooleanField(default=False)
    chrome_enterprise = models.BooleanField(default=False)
    acesso_remoto_id = models.CharField(max_length=50, blank=True)
    termo_custodia = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.nome} ({self.codigo_patrimonio})"

# Generated by Django 5.1.5 on 2025-01-26 21:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ativos', '0002_alter_ativo_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ativo',
            name='antivirus_licenca',
            field=models.CharField(choices=[('KASPERSKY ENDPOINT SECURITY FOR WINDOWS', 'KASPERSKY ENDPOINT SECURITY FOR WINDOWS'), ('MICROSOFT DEFENDER FOR ENDPOINT', 'MICROSOFT DEFENDER FOR ENDPOINT')], max_length=100),
        ),
        migrations.AlterField(
            model_name='ativo',
            name='antivirus_versao',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='ativo',
            name='status',
            field=models.CharField(choices=[('Operacional', 'Operacional'), ('Estoque', 'Estoque'), ('Reservado', 'Reservado')], max_length=50),
        ),
    ]

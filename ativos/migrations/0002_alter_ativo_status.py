# Generated by Django 5.1.5 on 2025-01-23 04:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ativos', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ativo',
            name='status',
            field=models.CharField(choices=[('Ativo', 'Ativo'), ('Inativo', 'Inativo')], max_length=50),
        ),
    ]

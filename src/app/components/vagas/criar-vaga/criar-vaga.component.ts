import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
	selector: 'sc-criar-vaga',
	templateUrl: './criar-vaga.component.html',
	styleUrls: ['./criar-vaga.component.css']
})
export class CriarVagaComponent implements OnInit {

	public isLinear = false;

	public beneficios = [
		'Auxílio Combustível'
		, 'Plano de Saúde'
		, 'Refeição no Local'
		, 'Vale Refeição'
		, 'Premiação por Meta/Desempenho'
		, 'Ajuda de Custo'
		, 'Convênio Farmácia'
		, 'Seguro de Vida'
		, 'Vale Transporte'
		, 'Cursos de Idiomas'
		, 'Auxílio Creche'
		, 'Convênio com Inst. de Ensino'
		, 'Carro Fornecido pela Empresa'
		, 'Celular Fornecido pela Empresa'
		, 'Ajuda de Custo'
		, 'Cesta Básica'
		, 'Estacionamento no Local'
		, 'Previdência Privada'
		, 'Vale Alimentação'
		, 'Participação nos Lucros'
		, 'Transp. Fornecido pela Empresa'
		, 'Lanche'
	]

	public categorias_direcao = [
		'A'
		, 'B'
		, 'C'
		, 'D'
		, 'E'
	]

	public competencias = [
		'Comunicação'
		, 'Flexibilidade'
		, 'Liderança Participativa'
		, 'Tomada de Decisão'
		, 'Criatividade'
		, 'Foco em Resultados'
		, 'Planejamento e Estratégia'
		, 'Trabalho em Equipe'
		, 'Empreendedorismo'
		, 'Iniciativa'
		, 'Solução de Conflitos'
		, 'Visão Sistêmica'
	];


	public filteredListaCategoriaVaga: Observable<string[]>;

	public listaCategoriaVaga = [
		'Administrativo, Arquivo/Biblioteca e Escritório'
		, 'Comércio/Vendas e Comércio Exterior'
		, 'Comunicação, Design, Marketing e Publicidade'
		, 'Informática/TI, Internet e Telecomunicações'
		, 'Financeiro, Faturamento/Contábil e Fiscal'
		, 'Departamento Jurídico/Advocacia'
		, 'Recursos Humanos/DP e Psicologia'
		, 'Saúde, Odontologia, Bem-Estar e Nutrição'
		, 'Educação, Ensino, Idiomas e Pedagogia'
		, 'Secretariado, Recepção e Teleatendimento'
		, 'Indústria, Manufatura e Produção/Fabricação'
		, 'Engenharias, Arquitetura e Projetos'
		, 'Segurança, Vigilância, Monitoramento e Portaria'
		, 'Telemarketing, Atendimento/Suporte e Cobrança'
		, 'Logística, Compras, Almoxarifado e Transportes'
		, 'Hotelaria, Turismo e Hospitalidade'
		, 'Serviços Gerais, Limpeza e Construção'
		, 'Estética, Moda e Beleza'
		, 'Manutenção, Instalação e Reparos'
		, 'Gastronomia, Alimentação e Culinária'
		, 'Esportes, Academias e Suplementos'
		, 'Mecânica, Eletrônica e Automação'
		, 'Diversos/Outros setores'
	];


	public dadosVaga = new FormGroup({
		logo: new FormControl('', [])
		, categoria: new FormControl('', Validators.required)
		, nomeResponsavelVaga: new FormControl('', Validators.required)
		, email: new FormControl('', [Validators.required, Validators.email])
		, nivelHierarquico: new FormControl('', Validators.required)
		, telefone: new FormControl('', [])
		, celular: new FormControl('', Validators.required)
		, observacoes: new FormControl('', [])
	});


	public perfilVaga = new FormGroup({
		vinculoEmpregaticio: new FormControl('', Validators.required)
		, cargo: new FormControl('', Validators.required)
		, salario: new FormControl('', Validators.required)
		, salarioCombinar: new FormControl('', [])
		, cargoComissionado: new FormControl('', Validators.required)
		, comissao: new FormControl('', [])
		, diasHoras: new FormControl('', Validators.required)
		, beneficios: this.buildBeneficios()
		, numeroVagas: new FormControl('', Validators.required)
		, estado: new FormControl('', Validators.required)
		, cidade: new FormControl('', Validators.required)
		, atividadesRealizadas: new FormControl('', Validators.required)
	});

	public requisitosVaga = new FormGroup({
		idadeMinima: new FormControl('', Validators.required)
		, escolaridade: new FormControl('', Validators.required)
		, tempoExperiencia: new FormControl('', Validators.required)
		, cursosNecessarios: new FormControl('', [])
		, conhecimentosEmSoftware: new FormControl('', [])
		, linguaEstrangeira: new FormControl('', [])
		, sexo: new FormControl('', Validators.required)
		, habilitacao: new FormControl('', Validators.required)
		, categoriaHabilitacao: this.buildCategoriaDirecao()
		, disponibilidadeViagem: new FormControl('', Validators.required)
		, veiculoProprio: new FormControl('', Validators.required)
		, competencias: this.buildCompetencias()
		, outrasInformacoes: new FormControl('', [])
		, vagaSigilosa: new FormControl('', Validators.required)
		, vagaUrgente: new FormControl('', Validators.required)
		, empresaConfidencial: new FormControl('', Validators.required)
	});


	constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) { }

	ngOnInit() {
		this.filteredListaCategoriaVaga = this.dadosVaga.get('categoria').valueChanges
			.pipe(
				startWith(''),
				map(value => this._filter(value))
			);
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.listaCategoriaVaga.filter(option => option.toLowerCase().includes(filterValue));
	}


	buildBeneficios() {
		const beneficios = this.beneficios.map(v => new FormControl(false));

		return this.fb.array(beneficios);
	}

	buildCategoriaDirecao() {
		const categorias = this.categorias_direcao.map(v => new FormControl(false));

		return this.fb.array(categorias);
	}

	buildCompetencias() {
		const competencias = this.competencias.map(v => new FormControl(false));
		return this.fb.array(competencias);
	}

	cadastrarVaga() {
	}


	limparCampoCategoriaVaga() {
		this.dadosVaga.get('categoria').reset();

		this.filteredListaCategoriaVaga = this.dadosVaga.get('categoria').valueChanges
			.pipe(
				startWith(''),
				map(value => this._filter(value))
			);
	}
}

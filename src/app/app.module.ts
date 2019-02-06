// * Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { MatAutocompleteModule, MatCheckboxModule, MatSelectModule, MatNativeDateModule, MatDatepickerModule, MatStepperModule, MatRadioModule, MatGridListModule, MatTooltipModule, MatToolbarModule, MatButtonModule, MatListModule, MatExpansionModule, MatInputModule, MatIconModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule,  MatDialogModule} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgCircleProgressModule } from 'ng-circle-progress';
// * Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ContentHeaderComponent } from './shared/content-header/content-header.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';
import { SectionHeaderComponent } from './shared/section-header/section-header.component';
import { AreaAtuacaoComponent } from './components/area-atuacao/area-atuacao.component';
import { ColaboradorComponent } from './components/colaborador/colaborador.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { CriarEmpresaComponent } from './components/empresas/criar-empresa/criar-empresa.component';
import { CriarAreaAtuacaoComponent } from './components/area-atuacao/criar-area-atuacao/criar-area-atuacao.component';
import { CriarColaboradorComponent } from './components/colaborador/criar-colaborador/criar-colaborador.component';
import { CargoComponent } from './components/cargo/cargo.component';
import { CriarCargoComponent } from './components/cargo/criar-cargo/criar-cargo.component';
import { OrgCardIndComponent } from './shared/org-card-ind/org-card-ind.component';
import { OrganoComponent } from './components/organo/organo.component';
import { CriarOrganoComponent } from './components/organo/criar-organo/criar-organo.component';
import { CardTemplateComponent } from './shared/org-card-ind/card-template/card-template.component'
import { EditarEmpresaComponent } from './components/empresas/editar-empresa/editar-empresa.component';
import { DiretrizesComponent } from './components/diretrizes/diretrizes.component';
import { AvaldesempenhoComponent } from './components/avaldesempenho/avaldesempenho.component';
import { ProfileComponent } from './components/colaborador/profile/profile.component';
import { FormularioContratoComponent } from './components/formulario-contrato/formulario-contrato.component'; 
import { RealizarAvaliacaoComponent } from './components/avaldesempenho/realizar-avaliacao/realizar-avaliacao.component';
import { VagasComponent } from './components/vagas/vagas.component';
import { CriarVagaComponent } from './components/vagas/criar-vaga/criar-vaga.component'
import { DialogAvaliacaoColaborador } from './modais/AvaliacaoDesempenho/avaliacaoColaborador/dialog-avaliacao-colaborador';

// * Modais - Dialogs
import { DialogNovoUsuarioParaAcessarSistema } from './modais/CriarEmpresa/NovoUsuarioEmpresaSistema/dialog-cria-usuario-acesso-empresa';
import { DialogNovaCompetenciaComponent } from './modais/AvaliacaoDesempenho/NovaCompetencia/dialog-cria-nova-competencia';
import { DialogNovaDiretriz } from './modais/CriarEmpresa/NovaDiretrizEmpresa/modal-nova-diretriz-empresa';
import { DialogNovaAvaliacaoComponent } from './modais/AvaliacaoDesempenho/criar-avaliacao/criar-avaliacao.component';
// * Services
import { AuthService } from './Services/auth.service';

// *  interfaces
import { LoginForm } from './interfaces/login-form';
import { RegistraClienteForm } from './interfaces/registra-form';
import { MensagemSucessoComponent } from './shared/mensagem-sucesso/mensagem-sucesso.component';
import { InputComponent } from './shared/input/input.component';
import { ModalsComponent } from './shared/modals/modals.component';

// * thrid-party
import {ToastModule} from 'primeng/toast'; //primeng
import {NgxMaskModule} from 'ngx-mask';


// * Diretivas
import { RoleAccessDirective } from './diretivas/role-access.directive';
import { CriarAvaliacaoComponent } from './avaldesempenho/criar-avaliacao/criar-avaliacao.component';
// pipes
import { FiltrarAvaliacoesPipe } from './pipes/filtrar-avaliacoes.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        NavComponent,
        FooterComponent,
        ContentHeaderComponent,
        LoginComponent,
        FormularioContratoComponent,
        DashboardComponent,
        RegistrarClienteComponent,
        SectionHeaderComponent,
        AreaAtuacaoComponent,
        ColaboradorComponent,
        EmpresasComponent,
        CriarEmpresaComponent,
        CriarAreaAtuacaoComponent,
        CriarColaboradorComponent,
        CargoComponent,
        CriarCargoComponent,
        OrganoComponent,
        CriarOrganoComponent,
        OrgCardIndComponent,
        CardTemplateComponent,
        MensagemSucessoComponent,
        InputComponent,
        ModalsComponent,
        EditarEmpresaComponent,
        DiretrizesComponent,
        AvaldesempenhoComponent,
        DialogNovaCompetenciaComponent,
        DialogNovoUsuarioParaAcessarSistema,
        DialogNovaDiretriz,
        DialogAvaliacaoColaborador,
        DialogNovaAvaliacaoComponent,
        ProfileComponent,
        //diretivas
        RoleAccessDirective,
        RealizarAvaliacaoComponent,
        VagasComponent,
        CriarVagaComponent,
        CriarAvaliacaoComponent,
        FiltrarAvaliacoesPipe,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxLoadingModule,
        MatInputModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatIconModule,
        MatTableModule,
        MatExpansionModule,
        MatListModule,
        MatButtonModule,
        MatDialogModule,
        MatToolbarModule,
        MatTooltipModule,
        MatGridListModule,
        MatStepperModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule, 
        MatSelectModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        ToastModule,
        DragDropModule,
        ScrollingModule,
        NgxChartsModule,

        NgxMaskModule.forRoot(),
        
        NgCircleProgressModule.forRoot({ 
            radius: 60
            ,maxPercent: 100
            ,toFixed: 1
            ,showUnits: true
            ,subtitle: 'Média'
            ,subtitleFontSize: '14'
        })
    ],
    providers: [ AuthService, MatDatepickerModule,],
    bootstrap: [AppComponent],
    entryComponents: [DialogNovaCompetenciaComponent, DialogNovoUsuarioParaAcessarSistema, DialogNovaDiretriz, DialogAvaliacaoColaborador, DialogNovaAvaliacaoComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from './app.roles';
// components
import { LoginComponent } from './login/login.component';
import { RegistrarClienteComponent } from './registrar-cliente/registrar-cliente.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AreaAtuacaoComponent } from './components/area-atuacao/area-atuacao.component';
import { ColaboradorComponent } from './components/colaborador/colaborador.component';
import { CriarColaboradorComponent } from './components/colaborador/criar-colaborador/criar-colaborador.component';
import { ProfileComponent } from './components/colaborador/profile/profile.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { EditarEmpresaComponent } from './components/empresas/editar-empresa/editar-empresa.component';
import { CriarEmpresaComponent } from './components/empresas/criar-empresa/criar-empresa.component';
import { CriarAreaAtuacaoComponent } from './components/area-atuacao/criar-area-atuacao/criar-area-atuacao.component';
import { CargoComponent } from './components/cargo/cargo.component';
import { CriarCargoComponent } from './components/cargo/criar-cargo/criar-cargo.component';
import { CriarOrganoComponent } from './components/organo/criar-organo/criar-organo.component';
import { OrganoComponent } from './components/organo/organo.component';
import { DiretrizesComponent } from './components/diretrizes/diretrizes.component';
import { AvaldesempenhoComponent } from './components/avaldesempenho/avaldesempenho.component';
import { FormularioContratoComponent } from './components/formulario-contrato/formulario-contrato.component';
import { RealizarAvaliacaoComponent } from './components/avaldesempenho/realizar-avaliacao/realizar-avaliacao.component'; 
import { VagasComponent } from './components/vagas/vagas.component';
import { CriarVagaComponent } from './components/vagas/criar-vaga/criar-vaga.component';

// services
import { BeforeLoginService } from './Services/before-login.service';
import { AfterLoginService } from './Services/after-login.service';
import { CanActivate } from '@angular/router/src/utils/preactivation';

const appRoutes: Routes = [
{
    path: 'acesso',
    component: LoginComponent,
    canActivate: [BeforeLoginService]

},
{
    path: 'contrato-cliente',
    component: FormularioContratoComponent,
    canActivate: [BeforeLoginService]
},
{
    path: 'avaliacao-desempenho',
    component: AvaldesempenhoComponent,
    canActivate: [AfterLoginService],
    data: { role: [Roles.Root, Roles.Administrador] }
},
{
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AfterLoginService],
    data: { role: [Roles.Root, Roles.Administrador, Roles.Basico, Roles.Restrito, Roles.Avaliacao] }
},
{
    path: 'cargo',
    component: CargoComponent,
    canActivate: [AfterLoginService],
    data: { role: [Roles.Root,  Roles.Administrador, Roles.Basico, Roles.Restrito] }
},
{
  path: 'cargo/diretrizes/:id',
  component: DiretrizesComponent,
  canActivate: [AfterLoginService],
  data: { role: [Roles.Root,  Roles.Administrador, Roles.Basico, Roles.Restrito] }
},
{
    path: 'area-atuacao',
    component: AreaAtuacaoComponent,
    canActivate: [AfterLoginService],
    data: { role: [Roles.Root,  Roles.Administrador, Roles.Basico, Roles.Restrito] }
},
{
    path: 'colaboradores',
    component: ColaboradorComponent,
    canActivate: [AfterLoginService],
    data: { role: [Roles.Root,  Roles.Administrador, Roles.Basico, Roles.Restrito] }
},
{
    path: 'colaborador/:id',
    component: ProfileComponent,
    canActivate: [AfterLoginService],
    data: { role: [Roles.Root,  Roles.Administrador, Roles.Basico, Roles.Restrito] }
},
{
    path: 'empresas',
    component: EmpresasComponent,
    canActivate: [AfterLoginService],
    data: { role: [Roles.Root,  Roles.Administrador, Roles.Basico, Roles.Restrito] }
},
{
    path: 'empresa/organograma/:id',
    component: CriarOrganoComponent,
    canActivate: [AfterLoginService],
    data: { role: [Roles.Root,  Roles.Administrador, Roles.Basico, Roles.Restrito] }
},
{
    path: 'empresa/editar/:id',
    component: EditarEmpresaComponent,
    canActivate: [AfterLoginService],
    data: { role: [Roles.Root,  Roles.Administrador, Roles.Basico, Roles.Restrito] }
},
{
    path: 'organo',
    component: OrganoComponent,
    canActivate: [AfterLoginService],
    data: { role: [Roles.Root,  Roles.Administrador, Roles.Basico, Roles.Restrito] }
},
// novo
{
    path: 'empresas/novo',
    component: CriarEmpresaComponent,
    canActivate: [AfterLoginService],
    data: { role: [Roles.Root,  Roles.Administrador, Roles.Basico, Roles.Restrito] }
},
{
    path: 'area-atuacao/novo',
    component: CriarAreaAtuacaoComponent,
    canActivate: [AfterLoginService],
    data: { role: [Roles.Root,  Roles.Administrador, Roles.Basico, Roles.Restrito] }
},
{
    path: 'colaboradores/novo',
    component: CriarColaboradorComponent,
    canActivate: [AfterLoginService],
    data: { role: [Roles.Root,  Roles.Administrador, Roles.Basico, Roles.Restrito] }
},
{
    path: 'cargo/novo',
    component: CriarCargoComponent,
    canActivate: [AfterLoginService],
    data: { role: [Roles.Root,  Roles.Administrador, Roles.Basico, Roles.Restrito] }
},
{
    path: 'cliente/novo', // cadastrar usuários no sistema.
    component: RegistrarClienteComponent,
    canActivate: [BeforeLoginService],
    data: { role: [Roles.Root,  Roles.Administrador, Roles.Basico, Roles.Restrito] }
},
{
    path: 'organo/novo', // cadastrar usuários no sistema.
    component: CriarOrganoComponent,
    canActivate: [AfterLoginService],
    data: { role: [Roles.Root, Roles.Administrador, Roles.Basico, Roles.Restrito,] }
},
{
    path: 'realizar-avaliacao',
    component: RealizarAvaliacaoComponent,
    canActivate: [AfterLoginService],
    data: { role: [Roles.Avaliacao] }
},
{
    path: 'realizar-avaliacao/:userId',
    component: RealizarAvaliacaoComponent,
    canActivate: [AfterLoginService],
    data: { role: [Roles.Avaliacao] }
},
{
    path: 'vagas', // cadastrar usuários no sistema.
    component: VagasComponent,
    canActivate: [AfterLoginService],
    data: { role: [Roles.Root, Roles.Administrador, Roles.Basico, Roles.Restrito,] }
},
{
    path: 'cria-vaga', // cadastrar usuários no sistema.
    component: CriarVagaComponent,
    canActivate: [AfterLoginService],
    data: { role: [Roles.Root, Roles.Administrador, Roles.Basico, Roles.Restrito,] }
}
];

@NgModule({
    imports: [
    RouterModule.forRoot(
        appRoutes
        )
    ],
    exports: [
    RouterModule
    ]
})
export class AppRoutingModule {}

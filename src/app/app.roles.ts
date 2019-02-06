/**
 *  Aqui configuramos os tipos de Roles (permissões / Acessos) que podem existir no sistema
 *  
 *  são 5 níveis.
 *  1 : Nível {Root} - Acesso Master. tem todas as pemissões possíveis. alem de poder ver o LOG de auditoria para averiguar todas as trançãoes do  sistema.
 *  2 : Nível {Administrador} - Tem todas as permissões que editar/excluir/criar no sistema. seja ela em qual área for.
 *  3 : Nível {Básico} - Tem acesso restrito. Não pode alterar/Criar nada. Apenas visualizar as informações já inseridas.
 *  4 : Nível {Restrito} - Este tem o modo de Leitura. só pode ler as informações mas de apenas algumas coisas. não tem acesso a todo o sistema.
 *  5 : Nível {Avaliação} - Este só tem permissão de Executar a sua avaliação de desempenho.e mesmo assim quando for solicitado. 
 */
export enum Roles {
    Root = 1,
    Administrador = 2,
    Basico = 3,
    Restrito = 4,
    Avaliacao = 5  
}


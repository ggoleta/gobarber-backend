**Mapeamento das tarefas**
* funcionalidades makros
  - Um overview de alguns serviços que depois será melhor definida, geralmente
  podemos visualizar essas funcionalidades através de uma tela do site.

  * funcionalidades mikros
    - Dentro de cada funcionalidade makro temos uma sub-divisão de tarefas/funcionalidades:

      - RF  -> Requisitos funcionais
        -> São as funcionalidades dentro de cada funcionalidade makro, ex:
          - usuário poderá recuperar a senha informando a senha antiga;
          - usuário poderaá atualizar sua foto de perfil (avatar)
          - etc.

      - RNF -> Requisitos não funcionais
        -> São itens que não estão ligadas a regra de negócio da nossa aplicação, relacionado mais a biblioteca/banco de dados a utilizar;
          - O envio de email será feito através da biblioteca node-mailer;

      - RN  -> Regra de negócio
        -> Sempre ligada a um requisito funcional

# Recuperação de senha
  **RF**
  -> o usuário deve poder recuperar sua senha informando o seu e-mail;
  -> o usuário deve receber um e-mail com instruções de recuperação da senha;
  -> o usuário deve poder resetar sua senha;

  **RNF**
  -> Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
  -> Utilizar Amazon SES para envios em produção;
  -> O envio de emails deve acontecer em segundo plano (background job);

  **RNF**
  -> O link enviado por email para resetar senha, deve expirar em 2h;
  -> O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil
  **RF**
  -> O usuário deve poder atualizar seu nome, email, senha;

  **RNF**
  ->

  **RNF**
  -> O usuário não pode alterar seu email para um email já utilizado;
  -> Para atualizar sua senha, o usuário deve informar a senha antiga;
  -> Para atulizar seua senha, o usuário precisa confirmar a nova senha

# Painel do prestador

# Agendamento de serviços
  **RF**
  -> O usuário deve poder listar todos os prestadores de serviço cadastrados;
  -> O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
  -> O usuário deve poder listar horários disponívies em um dia específico de um prestador;
  -> O usuário deve poder realizar um novo agendamento com um prestador.

  **RNF**
  ->

  **RNF**
  ->

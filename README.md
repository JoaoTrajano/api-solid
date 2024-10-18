## App

GymPass style app.

## RFs
- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins do usuário autenticado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km)
- [x] Deve ser possível buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs
- [x] Usuário não deve se cadastrar com e-mail duplicado;
- [x] Usuário não pode fazer check-in mais de uma vez no mesmo dia;
- [x] O usuário não pode fazer check-in, se não estiver a menos de 100 metros da academia;
- [x] O check-in só pode ser validado depois de 20 minutos de ter sido criado;
- [] O check-in só pode ser validado por administradores;
- [] A academia só pode ser cadastrada por administradores;

## RNFs
- [x] A senha do usuário precisa está criptografada;
- [x] Os dados serão persistidos em um banco de dados PostgreSQL;
- [x] Todas as listas de dados, precisam está paginadas com 10
- [] O usuário deve ser identificado através de um JWT
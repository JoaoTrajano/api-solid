# **GymPass Style App**

Uma aplicação inspirada no modelo **GymPass**, desenvolvida para facilitar a gestão de academias e o acompanhamento de check-ins pelos usuários. Este projeto oferece funcionalidades completas para usuários e administradores, garantindo uma experiência intuitiva e eficiente.

---

## **Funcionalidades (RFs)**

### **Usuário Final**
- ✅ Cadastro de usuário com validação de dados.  
- ✅ Autenticação segura com JWT.  
- ✅ Acesso ao perfil do usuário autenticado.  
- ✅ Visualização do número total de check-ins realizados.  
- ✅ Histórico detalhado de check-ins.  
- ✅ Busca de academias próximas (raio de até 10km).  
- ✅ Busca de academias pelo nome.  
- ✅ Realização de check-in em academias.  

### **Administrador**
- ✅ Validação de check-ins realizados por usuários.  
- ✅ Cadastro de novas academias.  

---

## **Regras de Negócio (RNs)**

- ✅ Não é permitido cadastro de usuários com e-mails duplicados.  
- ✅ Apenas um check-in por usuário é permitido por dia.  
- ✅ Check-ins só são permitidos se o usuário estiver a menos de **100 metros** da academia.  
- ✅ Validação de check-ins só pode ocorrer **20 minutos** após a criação.  
- ✅ **Somente administradores** podem validar check-ins.  
- ✅ **Somente administradores** podem cadastrar academias.  

---

## **Requisitos Não Funcionais (RNFs)**

- ✅ As senhas dos usuários são armazenadas de forma criptografada.  
- ✅ Persistência de dados utilizando **PostgreSQL**.  
- ✅ Todas as listas de dados são paginadas, com um limite de **10 itens por página**.  
- ✅ O usuário é autenticado e identificado através de **JWT (JSON Web Token)**.  

---

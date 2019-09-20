# Easy Carros Aplicativo - React Native - Frontend-Challenge

Desafio Easy Carros para frontend developers, aplicação em react native com sistema de autenticação de login, assim que o usuário é autenticado ele é redirecionado para o dashboard onde ele pose visualizar de uma forma simples e objetiva a lista de carros da sua frota.

Nessa tela o usário pode **Adicionaros** novos carros a frota ou **Deletar** os mesmos.

**O que foi usado:**
- React Native
- apisauce - ```Consumir a API```
- AsyncStorage

<img source="examples/screenshots/01.JPG">


# Como iniciar o aplicativo?


1. De um git clone em nosso repositório ou baixe o zip 

2. Abra o CMD cá a até a pasta da raiz da aplicação e de execute 

* ```o comando "yarn" ou "npm install"```.

3. após finalizar o processo de instalação das dependencias execute 

* ```o comando "react-native run-android"```

isso irá iniciar o aplicativo ou em seu emulador ou celular fisico.

4. agora, só iniciar a api.

Para utilizar o aplicativo utilize as Credenciais válidas:

* E-mail: ```frontend-dev@easycarros.com```
* Senha: ```Fr0nt3ndR0ck5!```


# A API

*Pré-requisitos
Você deve instalar os seguintes pacotes antes de prosseguir:

```yarn```

# Executando o servidor da API

Na raiz deste projeto, rode:
```
> cd src\services\api
> yarn install # vai demorar um pouco
> yarn start # o servidor irá escutar a porta 8181 por padrão
```
Se tudo correr bem, você verá a seguinte mensagem no seu terminal:


- ```App is listening on http://localhost:8181 ```

**O CORS da API está configurado para receber requisições de localhost:3000**

**Solução de problemas**

* Se ao executar yarn start você se deparar com um erro parecido com:
```
> Error: listen EADDRINUSE :::8181
>    at Server.setupListenHandle [as _listen2] (net.js:1330:14)
>    at listenInCluster (net.js:1378:12)
>    at Server.listen (net.js:1466:7)
>    ...
```

Significa que a porta 8181 está em uso no seu computador. Para utilizar uma porta diferente, rode:
```
PORT='<OUTRA PORTA>' yarn start
Se tiver problemas com CORS:
Altere o arquivo .env para as configurações do app frontend

APP_HOST=localhost
APP_PORT=3000

```

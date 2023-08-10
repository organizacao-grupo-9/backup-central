var userModel = require('../model/userModel');

// Funções Locais (Não será para exportar)-----------
function info(nome_funcao) {
    console.log(`\n[User Controller] ${nome_funcao}`);
}

// Funções para exportar
function listar(req, res) {
    info("listar()")
    userModel.listar().then((resultado)=> {

        if (resultado.length > 0) {
            res.status(200).json(resultado);
        }
        else {
            res.status(204).send("NAO ACHOU NADA NESSA BRINCADEIRA DE MAL GOSTO!!!");
        }

    }).catch((erro) => {
        console.log(erro);
        console.log("!! ERRO > UserController: Listar()\n", erro.sqlMessage)
    })
}

function cadastrar(req, res){
    
    info("cadastrar()");
    var nome = req.body.nome_html;
    var email = req.body.email_html;
    var senha = req.body.senha_html;

    if(nome == undefined){
        res.status(400).send("Seu nome está indefinido!");
    } else if (email == undefined){
        res.status(400).send("Seu email está indefinido!");
    } else if (senha == undefined){
        res.status(400).send("Sua senha está indefinido!");
    } else {

        userModel.cadastrar(nome, email, senha).then(
            function (resultado){
                res.json(resultado);
            }
        ).catch(
            function (erro){
                console.log(erro);
                console.log(erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function login(req, res) {

    info("login()");
    var email = req.body.email_html;
    var senha = req.body.senha_html;

    if (email == undefined) {
        res.status(400).send("Seu email está indefinido!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    }

    userModel.login(email, senha).then(
        function (resultado) {

            if (resultado.length == 1) {
                console.log(resultado);
                res.json(resultado[0]); 
            } else if (resultado.length == 0) {
                res.status(403).send("Email e/ou senha inválido(s)");
            } else {
                res.status(403).send("Mais de um usuário com o mesmo login");
            }
            
        }
    ).catch(
        function (erro){
            console.log(erro);
            console.log(erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );

}

module.exports = {
    listar,
    cadastrar,
    login
}


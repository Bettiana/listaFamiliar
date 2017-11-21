'use strict';

module.exports = function(Listafamiliar) {

    Listafamiliar.beforeRemote('create', function (context, Listafamiliar, next) {
        context.args.data.owner = context.req.accessToken.userId;
        next();
    });
    
     Listafamiliar.afterRemote('create', function (context, Listafamiliar, next) {
         // Buscamos la lista usuario de la base de datos
         var Usuario = Listafamiliar.app.models.Usuario;
         //busca los datos del usuario autenticado
         var idUser=context.req.accessToken.userId;
         //conocer el id de la lista que se ha guardado
         var idLista=Listafamiliar.id;
         //buscaos el usuario con esa id
         Usuario.findById(idUser, function(err, usuario){
             usuario.listaFamiliarId=idLista;
             usuario.save(function(err){
                 next();
             });
         });
    });
    
};

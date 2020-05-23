
	function setMenu(usuario){
	    
	    console.log(usuario);
 
	    if(usuario>0){
	        
	        document.getElementById("menu_crear_receta").style.display="";
	        document.getElementById("menu_mis_recetas").style.display="";
	        document.getElementById("menu_comentarios").style.display="";
	        document.getElementById("menu_foto_respuestas").style.display="";
	        document.getElementById("menu_siguiendo").style.display="";
            document.getElementById("menu_salir").style.display="";
	        document.getElementById("menu_perfil").style.display="";
	        document.getElementById("menu_salir").style.display="";
            document.getElementById("menu_notificaciones").style.display="";
	        document.getElementById("menu_login").style.display="none";
	        
	        
	    }else{
	        document.getElementById("menu_crear_receta").style.display="none";
	        document.getElementById("menu_mis_recetas").style.display="none";
	        document.getElementById("menu_comentarios").style.display="none";
	        document.getElementById("menu_foto_respuestas").style.display="none";
	        document.getElementById("menu_siguiendo").style.display="none";
	        document.getElementById("menu_perfil").style.display="none";
	        document.getElementById("menu_salir").style.display="none";
            document.getElementById("menu_notificaciones").style.display="none";
	        document.getElementById("menu_login").style.display="";
	    }
	    
	}
	
	function setUsuario(usu){
            
            mi_usuario=usu;
            
    }

    function guardarRecetaDeUsuario(receta){
        alert("entre a guardar receta de usuario");
        var parametros = {
            
            
            "mi_usuario": mi_usuario,
            "receta": receta
            
        };
        
        console.log(parametros);
        $.ajax({
           data:  parametros,
           type: 'POST',
           url: 'https://receteanding.com/index.php/app_controller/guardarRecetaDeUsuario',
           
           
           dataType: "json",
           
           success: function(data){
           console.log(data);
           
           if(data["resultado"]!=null && data["resultado"]>0){
           
           //emitir mensaje falta modal
           document.getElementById("title_error").innerHTML="Atenci贸n";
           document.getElementById("msg_error").innerHTML=data["mensaje"];
           $("#myModalError").modal();
           }else{
           document.getElementById("title_error").innerHTML="Error";
           document.getElementById("msg_error").innerHTML=data["mensaje"];
           $("#myModalError").modal();
           }
           
           },
           complete:function(){
           //corroborarSesion();
           //listarUltimasRecetas();
           },
           error: function(data){
           console.log(data);
           document.getElementById("msg_error").innerHTML=JSON.stringify(data);
           $("#myModalError").modal();
           }
           });
    }


 function buscarReceta(q){
            
            var parametros = {

                        "q":q,
                        "limit":mi_limit
                                                   

                                                };
                                                
                                                console.log(parametros);




                            $.ajax({
                                                    data:  parametros,
                                                    type: 'POST',
                                                    url: 'https://receteanding.com/index.php/app_controller/searchJson',


                                                    dataType: "json",

                                                    success: function(data){
                                                    console.log(data);
                                                        if(data!=null ){
                                                            document.getElementById("titulo_busqueda").innerHTML=data["titulo"];
                                                        contenido=' <ul class="blog-posts">';
                                                        entre=false;
                                                        for(i=0;i<data["recetas"].length;i++){
                                                            entre=true;
                                                           contenido+='<li>';
                                                            contenido+='              <a href="javascript:void(0);" onclick="irReceta('+data["recetas"][i]["receta_id"]+'");" >';
                                                            contenido+='    <div class="photo" style=" height: 160px;    min-height: 160px;    max-height: 160px; text-align: center; border:0;">';
                                                            
                                                                    if(data["recetas"][i]["receta_imagen_url"]!=null && data["recetas"][i]["receta_imagen_url"]!=""){
                                                            
                                                            contenido+='           <img src="'+data["recetas"][i]["receta_imagen_url"]+'" alt="" style="height:100%">';
                                                                        
                                                                    }else{
                                                                        
                                                                    contenido+='    <img src="https://placehold.it/400x400" alt="">  ';
                                                                        
                                                                    }
                                                                    
                                                                    
                                                                contenido+='</div>';
                                                                contenido+='</a> ';
                                                                contenido+='<div class="inner">';
                                                                    contenido+='<h3><a href="javascript:void(0);" onclick="irReceta('+data["recetas"][i]["receta_id"]+'");">'+data["recetas"][i]["receta_titulo"]+'</a></h3>';
                                                                descripcion=data["recetas"][i]["receta_descripcion"];
                                                                descripcion=String(descripcion).substring(0,200);
                                                                contenido+='    <p>'+descripcion+'</p>';
                                                                    contenido+='<div class="post-detail">';
                                                                        
                                                                        if(data["recetas"][i]["usuario_nick"]!=null && data["recetas"][i]["usuario_nick"]!=""){
                                                                            
                                                                            contenido+='<span class="post-author"><img src="https://receteanding.com/images/iconos/cocinero.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="#" style="cursor:none">'+data["recetas"][i]["usuario_nick"]+'</a></span>';
                                                                            
                                                                            
                                                                        }else{
                                                                            
                                                                            contenido+='<span class="post-author"><img src="https://receteanding.com/images/iconos/cocinero.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="#" style="cursor:none">'+data["recetas"][i]["usuario_nombre"]+' '+data["recetas"][i]["usuario_apellido"]+'</a></span>';
                                                                            
                                                                        }
                                                                        
                                                                        
                                                                        
                                                                        contenido+='<span class="post-comments"><img src="https://receteanding.com/images/iconos/comentarios.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="#"  style="cursor:none">';
                                                                        if(data["recetas"][i]["comentarios"]!=null){
                                                                            contenido+='('+data["recetas"][i]["comentarios"].length+') comentarios</a></span>';
                                                                        }else{
                                                                            contenido+='(0) comentarios</a></span>';
                                                                        } 
                                                                        contenido+='<span class="post-date"><img src="https://receteanding.com/images/iconos/calendario.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="#"  style="cursor:none">'+data["recetas"][i]["fecha_formateada"]+'</a></span>';
                                                                        contenido+='<span class="post-date"><img src="https://receteanding.com/images/iconos/receta.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="javascript:void(0);" onclick="buscarPorCategoria('+data["recetas"][i]["categoria_id"]+')">'+data["recetas"][i]["categoria_name"]+'</a></span>';
                                                                    contenido+='</div>';
                                                                    contenido+='<div style="    width: 100%;">';

                                                                    if(mi_usuario!=0){
                                                                        contenido+='<a href="javascript:void(0);" onclick="irReceta('+data["recetas"][i]["receta_id"]+');" style="text-align:center;width:49%" class="button-more">Ver Receta</a>';
                                                                    }else{

                                                                        contenido+='<a href="javascript:void(0);" onclick="irReceta('+data["recetas"][i]["receta_id"]+');" style="text-align:center;width:100%" class="button-more">Ver Receta</a>';
                                                                    }


                                                                    
                                                                    if(mi_usuario!=null &&  mi_usuario!="" && mi_usuario!=0 && mi_usuario==data["recetas"][i]["receta_usuario"]){
                                                                    
                                                                    contenido+='<a href="javascript:void(0);" onclick="irModificarReceta('+data["recetas"][i]["receta_id"]+'");"  style="text-align:center;width:49%; float:right;" class="button-more">Modificar Receta</a>';
                                                                    
                                                                    }
                                                                    
                                                                    
                                                                    if(mi_usuario!=null &&  mi_usuario!="" && mi_usuario!=0 && mi_usuario!=data["recetas"][i]["receta_usuario"]){
                                                                    
                                                                    contenido+='<a href="javascript:void(0)" onclick="guardarRecetaDeUsuario('+data["recetas"][i]["receta_id"]+')"  style="text-align:center;width:49%; float:right;" class="button-more">Guardar Receta</a>';
                                                                    
                                                                    }
                                                                    
                                                                    contenido+='</div>';
                                                                contenido+='</div>';
                                                            contenido+='</li>';
                                                            
                                                            
                                                        }
                                                        
                                                        if(entre){
                                                            contenido+='</ul>';
                                                            document.getElementById("contenedor_productos").innerHTML=contenido;
                                                        }
                                                        }

                                                    },
                                                    complete:function(){
                                                        //corroborarSesion();
                                                        
                                                    },
                                                    error: function(data){
                                                    console.log(data);
                                                        alert("Error al conectar con el servicio");
                                                    }
                            });  
        }

        /*INICIO ENTREGABLE 3*/

        function buscarRecetaCategoria(q){
           
                    var parametros = {

                                "q":q,
                                "limit":mi_limit


                                                        };

                                                        console.log(parametros);




                                    $.ajax({
                                                            data:  parametros,
                                                            type: 'POST',
                                                            url: 'https://receteanding.com/index.php/app_controller/searchByCategoryJson',


                                                            dataType: "json",

                                                            success: function(data){
                                           
                                                            console.log(data);
                                                                if(data!=null ){
                                                                    document.getElementById("titulo_busqueda").innerHTML=data["titulo"];
                                                                contenido=' <ul class="blog-posts">';
                                                                entre=false;
                                                                for(i=0;i<data["recetas"].length;i++){
                                                                    entre=true;
                                                                   contenido+='<li>';
                                                                    contenido+='              <a href="javascript:void(0);" onclick="irReceta('+data["recetas"][i]["receta_id"]+'");" >';
                                                                    contenido+='    <div class="photo" style=" height: 160px;    min-height: 160px;    max-height: 160px; text-align: center; border:0;">';

                                                                            if(data["recetas"][i]["receta_imagen_url"]!=null && data["recetas"][i]["receta_imagen_url"]!=""){

                                                                    contenido+='           <img src="'+data["recetas"][i]["receta_imagen_url"]+'" alt="" style="height:100%">';

                                                                            }else{

                                                                            contenido+='    <img src="https://placehold.it/400x400" alt="">  ';

                                                                            }


                                                                        contenido+='</div>';
                                                                        contenido+='</a> ';
                                                                        contenido+='<div class="inner">';
                                                                            contenido+='<h3><a href="javascript:void(0);" onclick="irReceta('+data["recetas"][i]["receta_id"]+'");">'+data["recetas"][i]["receta_titulo"]+'</a></h3>';
                                                                        descripcion=data["recetas"][i]["receta_descripcion"];
                                                                        descripcion=String(descripcion).substring(0,200);
                                                                        contenido+='    <p>'+descripcion+'</p>';
                                                                            contenido+='<div class="post-detail">';

                                                                                if(data["recetas"][i]["usuario_nick"]!=null && data["recetas"][i]["usuario_nick"]!=""){

                                                                                    contenido+='<span class="post-author"><img src="https://receteanding.com/images/iconos/cocinero.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="#" style="cursor:none">'+data["recetas"][i]["usuario_nick"]+'</a></span>';


                                                                                }else{

                                                                                    contenido+='<span class="post-author"><img src="https://receteanding.com/images/iconos/cocinero.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="#" style="cursor:none">'+data["recetas"][i]["usuario_nombre"]+' '+data["recetas"][i]["usuario_apellido"]+'</a></span>';

                                                                                }



                                                                                contenido+='<span class="post-comments"><img src="https://receteanding.com/images/iconos/comentarios.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="#"  style="cursor:none">';
                                                                                if(data["recetas"][i]["comentarios"]!=null){
                                                                                    contenido+='('+data["recetas"][i]["comentarios"].length+') comentarios</a></span>';
                                                                                }else{
                                                                                    contenido+='(0) comentarios</a></span>';
                                                                                }
                                                                                contenido+='<span class="post-date"><img src="https://receteanding.com/images/iconos/calendario.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="#"  style="cursor:none">'+data["recetas"][i]["fecha_formateada"]+'</a></span>';
                                                                                contenido+='<span class="post-date"><img src="https://receteanding.com/images/iconos/receta.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="javascript:void(0);" onclick="buscarPorCategoria('+data["recetas"][i]["categoria_id"]+')">'+data["recetas"][i]["categoria_name"]+'</a></span>';
                                                                            contenido+='</div>';
                                                                            contenido+='<div style="    width: 100%;">';
                                                                            contenido+='<a href="javascript:void(0);" onclick="irReceta('+data["recetas"][i]["receta_id"]+');" style="text-align:center;width:49%" class="button-more">Ver Receta</a>';

                                                                            if(mi_usuario!=null &&  mi_usuario!="" && mi_usuario!=0 && mi_usuario==data["recetas"][i]["receta_usuario"]){

                                                                            contenido+='<a href="javascript:void(0);" onclick="irModificarReceta('+data["recetas"][i]["receta_id"]+');"  style="text-align:center;width:49%; float:right;" class="button-more">Modificar Receta</a>';

                                                                            }


                                                                            if(mi_usuario!=null &&  mi_usuario!="" && mi_usuario!=0 && mi_usuario!=data["recetas"][i]["receta_usuario"]){

                                                                            contenido+='<a href="javascript:void(0)" onclick="guardarRecetaDeUsuario('+data["recetas"][i]["receta_id"]+')"  style="text-align:center;width:49%; float:right;" class="button-more">Guardar Receta</a>';

                                                                            }

                                                                            contenido+='</div>';
                                                                        contenido+='</div>';
                                                                    contenido+='</li>';


                                                                }

                                                                if(entre){
                                                                    contenido+='</ul>';
                                                                    document.getElementById("contenedor_productos").innerHTML=contenido;
                                                                }
                                                                }else{                                                           document.getElementById("titulo_busqueda").innerHTML="Ups! Sin registros" ;                                                              contenido+='<div class="about_author"><p> No exiten recetas con el criterio seleccionado</p></div>';                                                            document.getElementById("contenedor_productos").innerHTML=contenido;                                                           }


                                                            },
                                                            complete:function(){
                                                                //corroborarSesion();

                                                            },
                                                            error: function(data){
                                                            console.log(data);
                                                                alert("Error al conectar con el servicio");
                                                            }
                                    });
                }

                function buscarRecetaDeUsuario(q){

                                    var parametros = {

                                                "usuario":q,
                                                "limit":mi_limit


                                                                        };

                                                                        console.log(parametros);




                                                    $.ajax({
                                                                            data:  parametros,
                                                                            type: 'POST',
                                                                            url: 'https://receteanding.com/index.php/app_controller/recetasUsuario',


                                                                            dataType: "json",

                                                                            success: function(data){
                                                                            console.log(data);
                                                                                if(data!=null ){
                                                                                    document.getElementById("titulo_busqueda").innerHTML=data["titulo"];
                                                                                contenido=' <ul class="blog-posts">';
                                                                                entre=false;
                                                                                for(i=0;i<data["recetas"].length;i++){
                                                                                    entre=true;
                                                                                   contenido+='<li>';
                                                                                    contenido+='              <a href="javascript:void(0);" onclick="irReceta('+data["recetas"][i]["receta_id"]+'");" >';
                                                                                    contenido+='    <div class="photo" style=" height: 160px;    min-height: 160px;    max-height: 160px; text-align: center; border:0;">';

                                                                                            if(data["recetas"][i]["receta_imagen_url"]!=null && data["recetas"][i]["receta_imagen_url"]!=""){

                                                                                    contenido+='           <img src="'+data["recetas"][i]["receta_imagen_url"]+'" alt="" style="height:100%">';

                                                                                            }else{

                                                                                            contenido+='    <img src="https://placehold.it/400x400" alt="">  ';

                                                                                            }


                                                                                        contenido+='</div>';
                                                                                        contenido+='</a> ';
                                                                                        contenido+='<div class="inner">';
                                                                                            contenido+='<h3><a href="javascript:void(0);" onclick="irReceta('+data["recetas"][i]["receta_id"]+'");">'+data["recetas"][i]["receta_titulo"]+'</a></h3>';
                                                                                        descripcion=data["recetas"][i]["receta_descripcion"];
                                                                                        descripcion=String(descripcion).substring(0,200);
                                                                                        contenido+='    <p>'+descripcion+'</p>';
                                                                                            contenido+='<div class="post-detail">';

                                                                                                if(data["recetas"][i]["usuario_nick"]!=null && data["recetas"][i]["usuario_nick"]!=""){

                                                                                                    contenido+='<span class="post-author"><img src="https://receteanding.com/images/iconos/cocinero.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="#" style="cursor:none">'+data["recetas"][i]["usuario_nick"]+'</a></span>';


                                                                                                }else{

                                                                                                    contenido+='<span class="post-author"><img src="https://receteanding.com/images/iconos/cocinero.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="#" style="cursor:none">'+data["recetas"][i]["usuario_nombre"]+' '+data["recetas"][i]["usuario_apellido"]+'</a></span>';

                                                                                                }



                                                                                                contenido+='<span class="post-comments"><img src="https://receteanding.com/images/iconos/comentarios.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="#"  style="cursor:none">';
                                                                                                if(data["recetas"][i]["comentarios"]!=null){
                                                                                                    contenido+='('+data["recetas"][i]["comentarios"].length+') comentarios</a></span>';
                                                                                                }else{
                                                                                                    contenido+='(0) comentarios</a></span>';
                                                                                                }
                                                                                                contenido+='<span class="post-date"><img src="https://receteanding.com/images/iconos/calendario.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="#"  style="cursor:none">'+data["recetas"][i]["fecha_formateada"]+'</a></span>';
                                                                                                contenido+='<span class="post-date"><img src="https://receteanding.com/images/iconos/receta.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="javascript:void(0);" onclick="buscarPorCategoria('+data["recetas"][i]["categoria_id"]+')">'+data["recetas"][i]["categoria_name"]+'</a></span>';
                                                                                            contenido+='</div>';
                                                                                            contenido+='<div style="    width: 100%;">';
                                                                                            contenido+='<a href="javascript:void(0);" onclick="irReceta('+data["recetas"][i]["receta_id"]+');" style="text-align:center;width:49%" class="button-more">Ver Receta</a>';

                                                                                            if(mi_usuario!=null &&  mi_usuario!="" && mi_usuario!=0 && mi_usuario==data["recetas"][i]["receta_usuario"]){

                                                                                            contenido+='<a href="javascript:void(0);" onclick="irModificarReceta('+data["recetas"][i]["receta_id"]+');"  style="text-align:center;width:49%; float:right;" class="button-more">Modificar Receta</a>';

                                                                                            }


                                                                                            if(mi_usuario!=null &&  mi_usuario!="" && mi_usuario!=0 && mi_usuario!=data["recetas"][i]["receta_usuario"]){

                                                                                            contenido+='<a href="javascript:void(0)" onclick="guardarRecetaDeUsuario('+data["recetas"][i]["receta_id"]+')"  style="text-align:center;width:49%; float:right;" class="button-more">Guardar Receta</a>';

                                                                                            }

                                                                                            contenido+='</div>';
                                                                                        contenido+='</div>';
                                                                                    contenido+='</li>';


                                                                                }

                                                                                if(entre){
                                                                                    contenido+='</ul>';
                                                                                    document.getElementById("contenedor_productos").innerHTML=contenido;
                                                                                }
                                                                                }

                                                                            },
                                                                            complete:function(){
                                                                                //corroborarSesion();

                                                                            },
                                                                            error: function(data){
                                                                            console.log(data);
                                                                                emitirAlerta("Error al conectar con el servicio");
                                                                            }
                                                    });
                                }


                 function buscarRecetasGuardadas(){

                    var parametros = {

                                "id":mi_usuario,
                                "limit":mi_limit


                                                        };

                                                        console.log(parametros);




                                    $.ajax({
                                                            data:  parametros,
                                                            type: 'POST',
                                                            url: 'https://receteanding.com/index.php/app_controller/listarRecetasGuardadasJson',


                                                            dataType: "json",

                                                            success: function(data){
                                                            console.log(data);
                                                                if(data!=null ){
                                                                    document.getElementById("titulo_busqueda").innerHTML=data["titulo"];
                                                                contenido=' <ul class="blog-posts">';
                                                                entre=false;
                                                                for(i=0;i<data["recetas"].length;i++){
                                                                    entre=true;
                                                                   contenido+='<li>';
                                                                    contenido+='              <a href="javascript:void(0);" onclick="irReceta('+data["recetas"][i]["receta_id"]+');" >';
                                                                    contenido+='    <div class="photo" style=" height: 160px;    min-height: 160px;    max-height: 160px; text-align: center; border:0;">';

                                                                            if(data["recetas"][i]["receta_imagen_url"]!=null && data["recetas"][i]["receta_imagen_url"]!=""){

                                                                    contenido+='           <img src="'+data["recetas"][i]["receta_imagen_url"]+'" alt="" style="height:100%">';

                                                                            }else{

                                                                            contenido+='    <img src="https://placehold.it/400x400" alt="">  ';

                                                                            }


                                                                        contenido+='</div>';
                                                                        contenido+='</a> ';
                                                                        contenido+='<div class="inner">';
                                                                            contenido+='<h3><a href="javascript:void(0);" onclick="irReceta('+data["recetas"][i]["receta_id"]+');">'+data["recetas"][i]["receta_titulo"]+'</a></h3>';
                                                                        descripcion=data["recetas"][i]["receta_descripcion"];
                                                                        descripcion=String(descripcion).substring(0,200);
                                                                        contenido+='    <p>'+descripcion+'</p>';
                                                                            contenido+='<div class="post-detail">';

                                                                                if(data["recetas"][i]["usuario_nick"]!=null && data["recetas"][i]["usuario_nick"]!=""){

                                                                                    contenido+='<span class="post-author"><img src="https://receteanding.com/images/iconos/cocinero.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="#" style="cursor:none">'+data["recetas"][i]["usuario_nick"]+'</a></span>';


                                                                                }else{

                                                                                    contenido+='<span class="post-author"><img src="https://receteanding.com/images/iconos/cocinero.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="#" style="cursor:none">'+data["recetas"][i]["usuario_nombre"]+' '+data["recetas"][i]["usuario_apellido"]+'</a></span>';

                                                                                }



                                                                                contenido+='<span class="post-comments"><img src="https://receteanding.com/images/iconos/comentarios.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="#"  style="cursor:none">';
                                                                                if(data["recetas"][i]["comentarios"]!=null){
                                                                                    contenido+='('+data["recetas"][i]["comentarios"].length+') comentarios</a></span>';
                                                                                }else{
                                                                                    contenido+='(0) comentarios</a></span>';
                                                                                }
                                                                                contenido+='<span class="post-date"><img src="https://receteanding.com/images/iconos/calendario.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="#"  style="cursor:none">'+data["recetas"][i]["fecha_formateada"]+'</a></span>';
                                                                                contenido+='<span class="post-date"><img src="https://receteanding.com/images/iconos/receta.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="javascript:void(0);" onclick="buscarPorCategoria('+data["recetas"][i]["categoria_id"]+')">'+data["recetas"][i]["categoria_name"]+'</a></span>';
                                                                            contenido+='</div>';
                                                                            contenido+='<div style="    width: 100%;">';
                                                                            if(data["titulo"]=="Recetas Guardadas"){


                                                                            contenido+='<a href="javascript:void(0);" onclick="eliminarReceta('+data["recetas"][i]["receta_id"]+');" style="text-align:center;width:100%" class="button-more">Eliminar Receta</a>';
                                                                            }else{
                                                                            contenido+='<a href="javascript:void(0);" onclick="eliminarRecetaMg('+data["recetas"][i]["receta_id"]+'");" style="text-align:center;width:100%" class="button-more">Eliminar Receta</a>';
                                                                            }

                                                                           contenido+='</div>';


                                                                        contenido+='</div>';
                                                                    contenido+='</li>';


                                                                }

                                                                if(entre){
                                                                    contenido+='</ul>';
                                                                    document.getElementById("contenedor_productos").innerHTML=contenido;
                                                                }else{
                                                                    document.getElementById("contenedor_productos").innerHTML='';
                                                                }
                                                                }

                                                            },
                                                            complete:function(){
                                                                //corroborarSesion();

                                                            },
                                                            error: function(data){
                                                            console.log(data);

                                                                        document.getElementById("msg_error").innerHTML="Hubo problemas al procesar la solicitud, verifique su conexión a internet";
                                    								    document.getElementById("title_error").innerHTML="Error";
                                                                        $("#myModalError").modal();
                                                                        return false;
                                                            }
                                    });
                }


                 function buscarRecetasMeGustan(){

                    var parametros = {

                                "id":mi_usuario,
                                "limit":mi_limit


                                                        };

                                                        console.log(parametros);




                                    $.ajax({
                                                            data:  parametros,
                                                            type: 'POST',
                                                            url: 'https://receteanding.com/index.php/app_controller/listarRecetasMeGustaJson',


                                                            dataType: "json",

                                                            success: function(data){
                                                            console.log(data);
                                                                if(data!=null ){
                                                                    document.getElementById("titulo_busqueda").innerHTML=data["titulo"];
                                                                contenido=' <ul class="blog-posts">';
                                                                entre=false;
                                                                for(i=0;i<data["recetas"].length;i++){
                                                                    entre=true;
                                                                   contenido+='<li>';
                                                                    contenido+='              <a href="javascript:void(0);" onclick="irReceta('+data["recetas"][i]["receta_id"]+');" >';
                                                                    contenido+='    <div class="photo" style=" height: 160px;    min-height: 160px;    max-height: 160px; text-align: center; border:0;">';

                                                                            if(data["recetas"][i]["receta_imagen_url"]!=null && data["recetas"][i]["receta_imagen_url"]!=""){

                                                                    contenido+='           <img src="'+data["recetas"][i]["receta_imagen_url"]+'" alt="" style="height:100%">';

                                                                            }else{

                                                                            contenido+='    <img src="https://placehold.it/400x400" alt="">  ';

                                                                            }


                                                                        contenido+='</div>';
                                                                        contenido+='</a> ';
                                                                        contenido+='<div class="inner">';
                                                                            contenido+='<h3><a href="javascript:void(0);" onclick="irReceta('+data["recetas"][i]["receta_id"]+');">'+data["recetas"][i]["receta_titulo"]+'</a></h3>';
                                                                        descripcion=data["recetas"][i]["receta_descripcion"];
                                                                        descripcion=String(descripcion).substring(0,200);
                                                                        contenido+='    <p>'+descripcion+'</p>';
                                                                            contenido+='<div class="post-detail">';

                                                                                if(data["recetas"][i]["usuario_nick"]!=null && data["recetas"][i]["usuario_nick"]!=""){

                                                                                    contenido+='<span class="post-author"><img src="https://receteanding.com/images/iconos/cocinero.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="#" style="cursor:none">'+data["recetas"][i]["usuario_nick"]+'</a></span>';


                                                                                }else{

                                                                                    contenido+='<span class="post-author"><img src="https://receteanding.com/images/iconos/cocinero.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="#" style="cursor:none">'+data["recetas"][i]["usuario_nombre"]+' '+data["recetas"][i]["usuario_apellido"]+'</a></span>';

                                                                                }



                                                                                contenido+='<span class="post-comments"><img src="https://receteanding.com/images/iconos/comentarios.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="#"  style="cursor:none">';
                                                                                if(data["recetas"][i]["comentarios"]!=null){
                                                                                    contenido+='('+data["recetas"][i]["comentarios"].length+') comentarios</a></span>';
                                                                                }else{
                                                                                    contenido+='(0) comentarios</a></span>';
                                                                                }
                                                                                contenido+='<span class="post-date"><img src="https://receteanding.com/images/iconos/calendario.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="#"  style="cursor:none">'+data["recetas"][i]["fecha_formateada"]+'</a></span>';
                                                                                contenido+='<span class="post-date"><img src="https://receteanding.com/images/iconos/receta.png" style="width: 15px;margin-right: 5px; margin-left:5px;" /><a href="javascript:void(0);" onclick="buscarPorCategoria('+data["recetas"][i]["categoria_id"]+')">'+data["recetas"][i]["categoria_name"]+'</a></span>';
                                                                            contenido+='</div>';
                                                                            contenido+='<div style="    width: 100%;">';
                                                                            if(data["titulo"]=="Recetas Guardadas"){


                                                                            contenido+='<a href="javascript:void(0);" onclick="eliminarReceta('+data["recetas"][i]["receta_id"]+');" style="text-align:center;width:100%" class="button-more">Eliminar Receta</a>';
                                                                            }else{
                                                                            contenido+='<a href="javascript:void(0);" onclick="eliminarRecetaMg('+data["recetas"][i]["receta_id"]+');" style="text-align:center;width:100%" class="button-more">Eliminar Receta</a>';
                                                                            }

                                                                           contenido+='</div>';


                                                                        contenido+='</div>';
                                                                    contenido+='</li>';


                                                                }

                                                                if(entre){
                                                                    contenido+='</ul>';
                                                                    document.getElementById("contenedor_productos").innerHTML=contenido;
                                                                }else{
                                                                    document.getElementById("contenedor_productos").innerHTML='';
                                                                }
                                                                }

                                                            },
                                                            complete:function(){
                                                                //corroborarSesion();

                                                            },
                                                            error: function(data){
                                                            console.log(data);

                                                                        document.getElementById("msg_error").innerHTML="Hubo problemas al procesar la solicitud, verifique su conexi贸n a internet";
                                    								    document.getElementById("title_error").innerHTML="Error";
                                                                        $("#myModalError").modal();
                                                                        return false;
                                                            }
                                    });
                }


function eliminarRecetaMg(receta){





            var parametros = {

                        "id":receta,
                        "usuario":mi_usuario


                                                };

                                                console.log(parametros);




                            $.ajax({
                                                    data:  parametros,
                                                    type: 'POST',
                                                    url: 'https://receteanding.com/index.php/app_controller/eliminarRecetaDeUsuarioMgJson',


                                                    dataType: "json",

                                                    success: function(data){


                                                                document.getElementById("msg_error").innerHTML="Se procesó correctamente la solicitud";
                                                                document.getElementById("title_error").innerHTML="Atención";
                                                                $("#myModalError").modal();
                                                                return false;



                                                    },
                                                    complete:function(){
                                                        //corroborarSesion();
                                                        buscarRecetasMeGustan();
                                                    },
                                                    error: function(data){
                                                    console.log(data);
                                                        document.getElementById("msg_error").innerHTML="Hubo problemas al procesar la solicitud, verifique su conexi&oacute;n a internet";
                            								    document.getElementById("title_error").innerHTML="Error";
                                                                $("#myModalError").modal();
                                                                return false;
                                                    }
                            });



    }


    function eliminarReceta(receta){





                var parametros = {

                            "id":receta,
                            "usuario":mi_usuario


                                                    };

                                                    console.log(parametros);




                                $.ajax({
                                                        data:  parametros,
                                                        type: 'POST',
                                                        url: 'https://receteanding.com/index.php/app_controller/eliminarRecetaDeUsuarioJson',


                                                        dataType: "json",

                                                        success: function(data){


                                                                    document.getElementById("msg_error").innerHTML="Se procesó correctamente la solicitud";
                                                                    document.getElementById("title_error").innerHTML="Atención";
                                                                    $("#myModalError").modal();
                                                                    return false;



                                                        },
                                                        complete:function(){
                                                            //corroborarSesion();
                                                            buscarRecetasGuardadas();
                                                        },
                                                        error: function(data){
                                                        console.log(data);
                                                            document.getElementById("msg_error").innerHTML="Hubo problemas al procesar la solicitud, verifique su conexi&oacute;n a internet";
                                								    document.getElementById("title_error").innerHTML="Error";
                                                                    $("#myModalError").modal();
                                                                    return false;
                                                        }
                                });



        }

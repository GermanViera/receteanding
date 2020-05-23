function listarCategorias(){
    var parametros = {};
    $.ajax({
           data:  parametros,
           type: 'POST',
           url: 'https://receteanding.com/index.php/app_controller/listarCategoriasActivasJson',
           dataType: "json",
           success: function(data){
               console.log(data);
               contenido='';
               for(i=0;i<data.length;i++){
                   contenido+='<a href="javascript:void(0)" onclick="irRecetaDeCategoria('+data[i]["categoria_id"]+')" style="color: #FFFFFF;font-size: 16px;">'+data[i]["categoria_name"]+'</a>'+' | ';
                   }
                   if(contenido!=''){
                   document.getElementById("contenedor_categorias").innerHTML=contenido;
                   }
           },
           complete:function(){
               //corroborarSesion();
               listarUltimasRecetas();
               },
           error: function(data){
               console.log(data);
           
           }
    });
}

function listarUltimasRecetas(){
    var parametros = {};
    $.ajax({
           data:  parametros,
           type: 'POST',
           url: 'https://receteanding.com/index.php/app_controller/listarRecetasPrincipalJson',
           dataType: "json",
           success: function(data2){
               contenido2='';
               for(i2=0;i2<data2.length;i2++){
                    contenido2+='<div class="col-md-3 col-sm-6 col-xs-12" style="min-height:420px;">';
                    contenido2+='   <div class="menu-item"    style="min-height: 420px;">';
                    contenido2+='       <div class="menu-img">';
                    if(mi_usuario!=0){
                       contenido2+='<div style="position:absolute;background-color:#7daf74; color:#FFFFFF;padding:7px;bottom:0; "><a href="javascript:void(0)" onclick="megustaReceta('+data2[i2]["receta_id"]+')" style="color:#ffffff;"><i class="fa fa-heart-o"></i></a></div>';
                       contenido2+='<div style="position:absolute;background-color:#7daf74; color:#FFFFFF;padding:7px;bottom:0;right:0;"><a href="javascript:void(0)" onclick="guardarRecetaDeUsuario('+data2[i2]["receta_id"]+');"  style="color:#ffffff;"><i class="fa fa-bookmark-o"></i></a></div>';
                    }
                    if(data2[i2]["receta_nuevo"]){
                        contenido2+='<div style="position:absolute;background-color:#7daf74; color:#FFFFFF;padding:7px;">NUEVO</div> ';
                    }
                    if(data2[i2]["receta_imagen_url"]!=null && data2[i2]["receta_imagen_url"]!=""){
                        contenido2+='<a href="javascript:void(0)"  onclick="irReceta('+data2[i2]["receta_id"]+')"><img src="'+data2[i2]["receta_imagen_url"]+'" alt=""></a>';
           
           
                    }else{
                        contenido2+='<a href="javascript:void(0)"  onclick="irReceta('+data2[i2]["receta_id"]+')"><img src="http://placehold.it/400x400" alt=""></a>';
                    }
                    contenido2+='</div>';
                    contenido2+='<div class="menu-content">';
                    contenido2+='<div style="height:60px;">';
                    contenido2+='<h3><a href="javascript:void(0)" onclick="irReceta('+data2[i2]["receta_id"]+')">'+data2[i2]["receta_titulo"]+'</a></h3>';
                    contenido2+='</div>';
                    contenido2+='<div style="width:100%; margin: 0 auto;">';
                    if(data2[i2]["receta_vegano"]==1){
                        contenido2+='<img src="images/iconos/vegano.png" style="width: 45px;"/> ';
                    }
                    if(data2[i2]["receta_vegetariano"]==1){
                        contenido2+='<img src="images/iconos/vegetariano.png"  style="width: 45px;"/> ';
                    }
                    if(data2[i2]["receta_celiaco"]==1){
                        contenido2+='<img src="images/iconos/celiaco.png"  style="width: 45px;"/>';
                    }
                    contenido2+='</div>';
                    contenido2+='</div>';
                    contenido2+='<div style="position: absolute;    bottom: 10px;    text-align: center;    width: 100%;">';
                    contenido2+='    <br>';
                    contenido2+='    <div style="width:100%; height:60px;">';
                    nombre=data2[i2]["usuario_nombre"]+" "+data2[i2]["usuario_apellido"];
                    if(data2[i2]["usuario_foto_url"] !=null &&  data2[i2]["usuario_foto_url"]!=""){
                        if(data2[i2]["usuario_nick"]!=null && data2[i2]["usuario_nick"]!=""){
                            contenido2+='<p style="float:left"> <img src="'+data2[i2]["usuario_foto_url"]+'" class="img-circle"  style="max-width:30px;max-height:30px;margin: 10px; float:left;margin-left: 30px;"><span style="float: left;  margin-top: 10px;">Por '+data2[i2]["usuario_nick"]+'</span></p>';
                        }else{
                            if(String(nombre).length>10){
                                contenido2+='<p style="float:left"> <img src="'+data2[i2]["usuario_foto_url"]+'" class="img-circle"  style="max-width:30px;max-height:30px;margin: 10px; float:left;margin-left: 30px;"><span  style="float: left;  margin-top: 10px;">Por <?=substr($nombre, 0 ,20);?>...</span></p>';
                            }else{
                                contenido2+='<p style="float:left"> <img src="'+data2[i2]["usuario_foto_url"]+'" class="img-circle"  style="max-width:30px;max-height:30px;margin: 10px; float:left;margin-left: 30px;"><span  style="float: left;  margin-top: 10px;">Por '+data2[i2]["usuario_nombre"]+' '+data2[i2]["usuario_apellido"]+'</span></p>';
           
                            }
                        }
                    }else{
                        if(data2[i2]["usuario_nick"]!=null && data2[i2]["usuario_nick"]!=""){
                            contenido2+='<p style="float:left"><img src="rece.png" class="img-circle"  style="max-width:30px;max-height:30px;margin: 10px; float:left;margin-left: 30px;"><span style="float: left;  margin-top: 10px;" >Por '+data2[i2]["usuario_nick"]+' </span>   </p>';
           
                        }else{
                            if(String(nombre).length>10){
                                contenido2+='<p style="float:left"> <img src="rece.png" class="img-circle"  style="max-width:30px;max-height:30px;margin: 10px; float:left;margin-left: 30px;"><span  style="float: left;  margin-top: 10px;">Por '+String(nombre).substring(0, 20)+'...</span></p>';
                            }else{
                                contenido2+='<p style="float:left"><img src="rece.png" class="img-circle"  style="max-width:30px;max-height:30px;margin: 10px; float:left;margin-left: 30px;"><span  style="float: left;  margin-top: 10px;">Por '+data2[i2]["usuario_nombre"]+' '+data2[i2]["usuario_apellido"]+' </span> </p>    ';
                            }
                        }
                    }
        
                    contenido2+='</div>';
                    contenido2+='<div style="width:100%; display:flex;">';
                    contenido2+='    <a  href="javascript:void(0)"  onclick="irReceta('+data2[i2]["receta_id"]+')" class="button-more" style="width: 90%;    margin: 0 auto;">Ver Receta</a>';
                    contenido2+='</div>';
                    contenido2+='       </div>';
                    contenido2+='	</div>';
                    contenido2+='	</div>';
           
               }
               if(contenido2!=''){
                    document.getElementById("contenedor_ultimas_recetas").innerHTML=contenido2;
               }
           },
           complete:function(){
           //corroborarSesion();
           },
           error: function(data){
           
           }
        });
}

function irBuscar(){
    
    texto=document.getElementById("texto").value;
    if(texto==""){
        emitirAlerta("Debes ingresar un criterio de búsqueda");
    }else{
        irBuscar2(texto);
    }
}

function megustaReceta(receta){
    
    var parametros = {
        
        
        "mi_usuario": mi_usuario,
        "receta": receta
        
    };
    
    console.log(parametros);
    
    
    
    
    $.ajax({
           data:  parametros,
           type: 'POST',
           url: 'https://receteanding.com/index.php/app_controller/megustaReceta',
           
           
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



// fin entregable 2



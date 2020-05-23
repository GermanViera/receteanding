function validarDatos(){
            email=document.getElementById("email").value;
            password=document.getElementById("password").value;

            if(email=="" || password==""){
                document.getElementById("msg_error").innerHTML="Debes completar email y password";
                $("#myModalError").modal();
                return false;
            }else{

                var parametros = {


                                "email":email,
                                "password":password

                                                };




                            $.ajax({
                                                    data:  parametros,
                                                    type: 'POST',
                                                    url: 'https://receteanding.com/index.php/app_controller/doLogin',


                                                    dataType: "json",
                                                    beforeSend: function() {
                                                    document.getElementById("loading").style.display="block";
                                                    },
                                                    complete: function() {

                                                     document.getElementById("loading").style.display="none";
                                                     },
                                                    success: function(data){
                                   
                                                        document.getElementById("loading").style.display="";
                                                        if(data!=null){
                                                            //acceso a la app
                                                           // alert(JSON.stringify(data));
                                                            nombre=data["nombreu"];
                                                            respuesta=data["respuesta"];
                                                            if (respuesta == 1) {
                                                               // alert(data);     
                                                                cargarSesionUsuario(data["uidu"],"app",nombre,data["nick"]);
                                                            }else{
                                                               mensaje=data["mensaje"];
                                                               document.getElementById("msg_error").innerHTML=mensaje;
                                                               $("#myModalError").modal();
                                                               return false;
                                   
                                                                
                                                            }

                                                        }else{
                                                             document.getElementById("msg_error").innerHTML="No encontramos registros en nuestro sistema";
                                                                $("#myModalError").modal();
                                                                return false;
                                                        }


                                                    },
                                                    error: function(data){
                                                    console.log(JSON.stringify(data));
                                                        //document.getElementById("msg_error").innerHTML="Error de conectividad, vuelva a intentarlo";
                                                        document.getElementById("msg_error").innerHTML=JSON.stringify(data);
                                                        $("#myModalError").modal();
                                                        return false;
                                                    }
                            });

            }
        }
        
        function validarDatosRestablecer(){
            email=document.getElementById("inputEmail").value;
           

            if(email==""){
                document.getElementById("msg_error").innerHTML="Debes completar email";
                $("#myModalError").modal();
                return false;
            }else{

                var parametros = {


                                "email":email

                                                };




                            $.ajax({
                                                    data:  parametros,
                                                    type: 'POST',
                                                    url: 'https://receteanding.com/index.php/app_controller/resetPassword',


                                                    dataType: "json",
                                                    beforeSend: function() {
                                                    document.getElementById("loading").style.display="block";
                                                    },
                                                    complete: function() {

                                                     document.getElementById("loading").style.display="none";
                                                     },
                                                    success: function(data){
                                                    console.log(JSON.stringify(data));

                                                        if(data!=null){
                                                            //acceso a la app
                                                                document.getElementById("msg_error").innerHTML=data["mensaje"];
                                                                $("#myModalError").modal();
                                                                return false;
                                                                

                                                        }else{
                                                             document.getElementById("msg_error").innerHTML="No encontramos registros en nuestro sistema";
                                                                $("#myModalError").modal();
                                                                return false;
                                                        }


                                                    },
                                                    error: function(data){
                                                    console.log(JSON.stringify(data));
                                                        //document.getElementById("msg_error").innerHTML="Error de conectividad, vuelva a intentarlo";
                                                        document.getElementById("msg_error").innerHTML=JSON.stringify(data);
                                                        $("#myModalError").modal();
                                                        return false;
                                                    }
                            });

            }
        }

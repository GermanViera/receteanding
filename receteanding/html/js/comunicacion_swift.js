function irInicio(){
    window.location = "inicio://fizz?";
}

function emitirAlerta( texto){
    window.location = "alerta://fizz?" +  texto;
}

function irLogin(){
    
    window.location = "login://fizz?";
}

function cerrarSesion(){
    window.location = "cerrarsesion://fizz?";
}

function irCategorias(){
    window.location = "categoria://fizz?";
}

function irRegistro(){
    window.location = "registro://fizz?";
}

function irLoginGoogle(){
    window.location = "loggingoogle://fizz?";
}

function cargarSesionUsuario(p1,p2,p3,p4){
   
    window.location = "cargarsesion://fizz?" + p1 ;
}


function irCrearReceta(){
    window.location = "crear://fizz?";
}
function irMisRecetas(){
    window.location = "misrecetas://fizz?";
}

function irRecetasGuardadas(){
    window.location = "recetasguardadas://fizz?";
}

function irRecetasMeGustan(){
    window.location = "recetasmegusta://fizz?";
}

function verComentarios(mode){
    window.location = "comentarios://fizz?" + mode ;
}

function irSiguiendo(){
    window.location = "siguiendo://fizz? ";
}

function irPerfil(){
    window.location = "alerta://fizz?" +  "ir perfil  no implementado";
}


function traerRecetas(param1,param2){
   // alert("traer Receta");
     window.location = "receta://fizz?" +  param1  + "@" + param2;
}

function irReceta(param1){
   // alert("ir Receta");
    window.location = "irreceta://fizz?" +  param1;
}
    


function openWhatsApp(url){
    window.location = "whatsapp://fizz?" +  url;
}

function openTwitter(url){
    window.location = "twitter://fizz?" +  url;
}

function openFacebook(url){
    window.location = "facebook://fizz?" +  url;
}


function irBuscar2(texto){
    
   window.location = "buscar://fizz?" +  texto;
}

function buscarPorCategoria(texto){
    
     window.location = "buscarcategoria://fizz?" +  texto;
}

function irModificarReceta(texto){
    
    window.location = "modificarreceta://fizz?" + texto;
}

function irRecetaDeCategoria(param1){
    alert(param1);
     window.location = "recetadecategoria://fizz?" +  param1;
}

function recetasUsuario(param1){
   
    window.location = "recetausuario://fizz?" +  param1;
}



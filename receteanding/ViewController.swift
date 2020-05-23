//
//  ViewController.swift
//  receteanding
//
//  Created by German on 8/23/19.
//  Copyright © 2019 German. All rights reserved.
//

import UIKit
//import FacebookCore
//import FacebookLogin
import GoogleSignIn

class ViewController: BaseViewController,UIWebViewDelegate ,GIDSignInUIDelegate, GIDSignInDelegate {
    
    var usuario:String = ""
    let usuariodefault = ""
    var jsonCompleto  :[String: Any]?
    var page = "index"
    var param_page = ""
    @IBOutlet weak var webview: UIWebView!
   
    
    override func viewDidLoad() {
        super.viewDidLoad()
        addSlideMenuButton()
        addNavBarImage()
        self.navigationItem.setHidesBackButton(true, animated: true);
        if let user = UserDefaults.standard.value(forKey: usuariodefault) as? String {
             print("usuario" + user)
            self.usuario = user
        }
        setUsuario(usuario2: self.usuario)
        if (param_page != ""){
            if param_page == "cerrar" {
                let alert = UIAlertController(title: "Estado", message: "Cerrar Sesion", preferredStyle: .alert)
                let OKaction = UIAlertAction(title: "OK", style: .default) {(action: UIAlertAction!) in
                    
                    print("cerrar session")
                    GIDSignIn.sharedInstance().signOut()
                    self.usuario = ""
                    UserDefaults.standard.set(self.usuario, forKey: self.usuariodefault)
                    self.setUsuario(usuario2: "")
                    self.cargarhtml(name: "index",usuario:"\(self.usuario)")
                    self.cargarhtml(name: "index",usuario:"\(self.usuario)")
                    
                    
                }
                alert.addAction(OKaction)
                self.present(alert, animated: true, completion: nil)
                
                
            }else{
                print("param_page activado")
                var param = "\(self.usuario)#\(self.param_page)#\(self.usuario)"
                self.cargarhtml(name: self.page,usuario:param)
                
            }
       
        }else {
             self.cargarhtml(name: self.page,usuario:self.usuario)
        }
        
    }
    
    private   func cargarhtml(name: String,usuario:String){
        let url = Bundle.main.url(forResource: name, withExtension: "html",subdirectory:"html")
        var parametros = ""
        if usuario != "" {
            parametros = usuario.addingPercentEncoding(withAllowedCharacters: .urlHostAllowed)!
        }else {
            parametros = usuario
        }
        let fragUrl = NSURL(string: "#\(parametros)", relativeTo: url)!
        let req = NSURLRequest(url : fragUrl as URL)
        self.webview.delegate = self
        self.webview.loadRequest(req as URLRequest)
    }
    
    
    
    func webView(_ webView: UIWebView, shouldStartLoadWith request: URLRequest, navigationType: UIWebView.NavigationType) -> Bool {
        
        
        if request.url?.query != nil {
            
            if request.url!.scheme!  == "alerta" {
                
                let datos = request.url!.query!.removingPercentEncoding
                let alert = UIAlertController(title: "Estado", message: datos, preferredStyle: .alert)
                let OKaction = UIAlertAction(title: "OK", style: .default) {(action: UIAlertAction!) in print("hole") }
                alert.addAction(OKaction)
                self.present(alert, animated: true, completion: nil)
                
            } else if request.url!.scheme! == "login" {
                print("Ir login")
                self.cargarhtml(name: "login",usuario:"")
            
            }else if request.url!.scheme! == "logginfacebook" {
               /*     print("LOGGIN CON FACEBOOK")
                   let manager = LoginManager()
                    manager.logIn(readPermissions:[.publicProfile,.email], viewController: self)
                    { (result) in
                        switch result{
                            case .cancelled:break
                            case.failed(let error) :
                                let alert = UIAlertController(title: "Estado", message: error as? String, preferredStyle: .alert)
                                let OKaction = UIAlertAction(title: "OK", style: .default) {(action: UIAlertAction!) in print("hole") }
                                alert.addAction(OKaction)
                                self.present(alert, animated: true, completion: nil)
                                break
                        case .success(let grantedPermissions , let declinedPermissions, let token):
                            print(grantedPermissions)
                            print(declinedPermissions)
                            print(token)
                            break
                        }
                }
                
                */
                
            }else if request.url!.scheme == "loggingoogle" {
                
                print("entre a login de google")
                GIDSignIn.sharedInstance().delegate = self
                GIDSignIn.sharedInstance().uiDelegate=self
              GIDSignIn.sharedInstance().signIn()
                
            }else if request.url!.scheme! == "categoria" {
                print("Ir cateogria")
                self.cargarhtml(name: "categorias",usuario:"\(self.usuario)")
                
            }else if request.url!.scheme! == "inicio" {
            print("Ir inicio")
            self.cargarhtml(name: "index",usuario:"\(self.usuario)")
                
            }else if request.url!.scheme! == "registro" {
                print("Ir registro")
                self.cargarhtml(name: "register",usuario:"")
            
            }else if request.url!.scheme! == "cargarsesion" {
                print("cargar session")
                let datos = request.url!.query!.removingPercentEncoding
                self.usuario = datos!
                self.setUsuario(usuario2: datos!)
                print ("guardando usuario::::::" + self.usuario)
                UserDefaults.standard.set(self.usuario, forKey: usuariodefault)
                self.cargarhtml(name: "index",usuario:"\(self.usuario)")
            
            }else if request.url!.scheme! == "cerrarsesion"{
                
                let alert = UIAlertController(title: "Estado", message: "Cerrar Sesion", preferredStyle: .alert)
                let OKaction = UIAlertAction(title: "OK", style: .default) {(action: UIAlertAction!) in
                
                print("cerrar session")
                GIDSignIn.sharedInstance().signOut()
                self.usuario = ""
                    UserDefaults.standard.set(self.usuario, forKey: self.usuariodefault)
                self.cargarhtml(name: "index",usuario:"\(self.usuario)")
                self.cargarhtml(name: "index",usuario:"\(self.usuario)")
                
                
                }
                alert.addAction(OKaction)
                self.present(alert, animated: true, completion: nil)
                
                
                
                
                
            
            }else if request.url!.scheme! == "receta"{
                print("treaer receta")
                let aString = request.url!.query!.removingPercentEncoding!
                let newString = aString.replacingOccurrences(of: "@", with: ";", options: .literal, range: nil)
                print(newString)
                let parametros = newString.components(separatedBy: ";")
                self.cargarhtml(name: "ficha_receta",usuario:"\(self.usuario)#\(parametros[0])#\(parametros[1])")
            }else if request.url!.scheme! == "irreceta"{
                print("ir receta")
                let param = request.url!.query!.removingPercentEncoding!
               
                self.cargarhtml(name: "ficha_receta",usuario:"\(self.usuario)#\(param)")
            }else if request.url!.scheme! == "whatsapp"{
                print("ir whatsapp")
                let url = request.url!.query!.removingPercentEncoding!
                print(url)
                let urlString = "whatsapp://send?text=\(url)"
                
                let urlStringEncoded = urlString.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
                
                let URL = NSURL(string: urlStringEncoded!)
                
                if UIApplication.shared.canOpenURL(URL! as URL) {
                    UIApplication.shared.openURL(URL! as URL)
                }
            }else if request.url!.scheme! == "twitter" {
                let url = request.url!.query!.removingPercentEncoding!
                print(url)
                
                let urlString = "twitter://post?message=\(url)"
                
                let urlStringEncoded = urlString.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)
                let URL = NSURL(string: urlStringEncoded!)
                
                if UIApplication.shared.canOpenURL(URL! as URL) {
                    UIApplication.shared.openURL(URL! as URL)
                }else{
                    let application = UIApplication.shared
                    let webURL = NSURL(string: "https://twitter.com/")!
                    if #available(iOS 10.0, *) {
                        application.open(webURL as URL)
                    } else {
                        application.openURL(webURL as URL)
                    }
                }
            }else if request.url!.scheme! == "facebook" {
            let url = request.url!.query!.removingPercentEncoding!
            print(url)
                let URL = NSURL(string: url)
            let application = UIApplication.shared
            if #available(iOS 10.0, *) {
                application.open(URL as! URL)
            } else {
                application.openURL(URL as! URL)
                }
            } else if request.url!.scheme! == "buscar"{
                let datos = request.url!.query!.removingPercentEncoding
                print(datos)
                
                self.cargarhtml(name: "busqueda",usuario:"\(self.usuario)#texto#\(datos as! String)")
            
            } else if request.url!.scheme! == "recetadecategoria"{
                let idcategoria = request.url!.query!.removingPercentEncoding
                
                self.cargarhtml(name: "busqueda",usuario:"\(self.usuario)#categoria#\(idcategoria as! String)")
                
            } else if request.url!.scheme! == "recetausuario"{
                let idusuario = request.url!.query!.removingPercentEncoding
                print(idusuario)
                self.cargarhtml(name: "busqueda",usuario:"\(self.usuario)#usuario#\(idusuario as! String)")
                
            } else if request.url!.scheme! == "misrecetas"{
                self.cargarhtml(name: "busqueda",usuario:"\(self.usuario)#misrecetas#\(self.usuario)")
                
            } else if request.url!.scheme! == "recetasmegusta"{
                self.cargarhtml(name: "busqueda",usuario:"\(self.usuario)#megusta#\(self.usuario)")
            } else if request.url!.scheme! == "recetasguardadas"{
                self.cargarhtml(name: "busqueda",usuario:"\(self.usuario)#guardadas#\(self.usuario)")
            } else if request.url!.scheme! == "modificarreceta"{
                let idreceta = request.url!.query!.removingPercentEncoding
                self.cargarhtml(name: "crear_receta",usuario:"\(self.usuario)#\(idreceta as! String)")
            
              
            
            
            }else if request.url!.scheme! == "crear"{
                let idcategoria = request.url!.query!.removingPercentEncoding
                self.cargarhtml(name: "crear_receta",usuario:"\(self.usuario)")
                
            } else if request.url!.scheme! == "siguiendo"{
                print("seguidores.html")
                print(self.usuario)
                self.cargarhtml(name: "seguidores",usuario:"\(self.usuario)")
                
            } else if request.url!.scheme! == "comentarios"{
                let mode = request.url!.query!.removingPercentEncoding
                print("comentarios.html")
                print(self.usuario)
                self.cargarhtml(name: "comentarios",usuario:"\(self.usuario)#\(mode as! String)")
            
        }
       
            
            
            
        
            
            
        
            
            return true
        }
        return true
        
    }
    
    
  /*
    
    func obtener_token(datos:[String:Any]){
       var facebook_id:String = ""
        let nombre = (datos["name"] as? String)!
        facebook_id = (datos["id"] as? String)!
        let url="http://graph.facebook.com/\(facebook_id)/picture?type=large"
        let genero = "O"
        let fecha_nacimiento = "0000-00-00"
        let myUrl = URL(string: "http://tenmorefit.com/admin/index.php/usuario_controller/guardarUsuarioFacebookJson")
        let request = NSMutableURLRequest(url:myUrl!)
        request.httpMethod = "POST"
        let postString = "nombre=\(nombre)&url=\(url)&facebook_id=\(facebook_id)&genero=\(genero)&fecha_nacimiento=\(fecha_nacimiento)"
        request.httpBody = postString.data(using: String.Encoding.utf8)
        
        let task = URLSession.shared.dataTask(with: request as URLRequest){
            data, response, error in
            
            if error != nil
            {
                print("error=\(String(describing: error))")
                return
            }else{
                
                let nsdata:Data =  NSData(data: data!) as Data
                do
                {
                    self.jsonCompleto = try JSONSerialization.jsonObject(with: nsdata, options: JSONSerialization.ReadingOptions.mutableContainers) as? [String : Any]
                    self.usuario = self.jsonCompleto!["usuario_id"] as! String;
                    
                    DispatchQueue.main.async { () -> Void in
                        let alert2 = UIAlertController(title: "Status", message: "It has been correctly registered through Facebook", preferredStyle: .alert)
                        let OKaction2 = UIAlertAction(title: "OK", style: .default) {(action: UIAlertAction!) in print("hole") }
                        alert2.addAction(OKaction2)
                        self.present(alert2, animated: true, completion: nil)
                        self.cargarhtml(name: "pantalla_principal",usuario:self.usuario)
                    }
                    
                    
                    
                }
                catch {
                    print()
                }
            }
            
        }
 
        task.resume()
         
        
    }
  */
    func sign(_ signIn: GIDSignIn!, didSignInFor user: GIDGoogleUser!, withError error: Error!) {
        
        
        if error != nil  {
            let alert = UIAlertController(title: "Estado", message: "no loggin con Google", preferredStyle: .alert)
            let OKaction = UIAlertAction(title: "OK", style: .default) {(action: UIAlertAction!) in print("hole") }
            alert.addAction(OKaction)
            self.present(alert, animated: true, completion: nil)
            return
            
        } else if (user != nil) {
            let email = user.profile.email!
            let googleid = user.userID!
            let name = user.profile.name!
            registrarUsuarioGoogle(nombre: name, email: email, googleid: googleid, url: "aa")
            
        }
    }
    
    
    func sign(inWillDispatch signIn: GIDSignIn!, error: Error!) {
        
    }
    // Present a view that prompts the user to sign in with Google
    
    func sign(_ signIn: GIDSignIn!,
              present viewController: UIViewController!) {
        self.present(viewController, animated: true, completion: nil)
        
    }
    // Dismiss the "Sign in with Google" view
    
    func sign(_ signIn: GIDSignIn!,
              dismiss viewController: UIViewController!) {
        self.dismiss(animated: true, completion: nil)
        
    }
    
    func registrarUsuarioGoogle(nombre:String,email:String,googleid:String,url:String){
        
        
        
        print(email,nombre,googleid)
        
       let myUrl = URL(string: "https://morfeat.com/admin/index.php/usuario_controller/guardarUsuarioGoogleJson")
        let request = NSMutableURLRequest(url:myUrl!)
        request.httpMethod = "POST"
        let postString = "nombre=\(nombre)&email=\(email)&url=\(url)&google_id=\(googleid)"
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
        request.httpBody = postString.data(using: String.Encoding.utf8)
        
        
        
        
        let task = URLSession.shared.dataTask(with: request as URLRequest){
            data, response, error in
            
            
            print(data)
            print(response)
            print(error)
            
            if error != nil
            {
                print("error=\(String(describing: error))")
                return
            }else{

                    do {
                        // make sure this JSON is in the format we expect
                        if let json = try JSONSerialization.jsonObject(with: data!, options:[]) as? [String : Any] {
                            // try to read out a string array
                            print(json)
                            let usuarioid = json["usuario_id"]  as! Int
                            self.usuario = String(usuarioid)
                             print(usuarioid)
                            self.setUsuario(usuario2: String(usuarioid))
                            let error = json["error"] as? String
                            if error != nil {
                                print(usuarioid)
                                DispatchQueue.main.async { () -> Void in
                                    let alert3 = UIAlertController(title: "Estado", message: "Registro correcto mediante google", preferredStyle: .alert)
                                    let OKaction3 = UIAlertAction(title: "OK", style: .default) {(action: UIAlertAction!) in print("hole2222") }
                                    alert3.addAction(OKaction3)
                                    self.present(alert3, animated: true, completion: nil)
                                    UserDefaults.standard.set(self.usuario, forKey: self.usuariodefault)
                                    
                                   
                                    self.cargarhtml(name: "index",usuario:"\(self.usuario)")
                                    
                                }
                            }
                        }
                    } catch let error as NSError {
                        print("Failed to load: \(error.localizedDescription)")
                    }
                
                    
                
           
            }
            
        }
        
        task.resume()
        
    }

}


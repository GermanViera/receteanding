//
//  MenuViewController.swift
//  receteanding
//
//  Created by German on 5/21/20.
//  Copyright © 2020 German. All rights reserved.
//

import UIKit

protocol SlideMenuDelegate {
    func slideMenuItemSelectedAtIndex(_ index: Int32)
}
class MenuViewController: UIViewController,UITableViewDelegate,UITableViewDataSource{
     
    var usuario:String = ""
    
    var MenuItem = ["INICIO","CREAR RECETAS","MIS CREACIONES","RECETAS GUARDADAS","RECETAS QUE ME GUSTAN","COMENTARIOS","FOTO RESPUESTA","SIGUIENDO","NOTIFICACIONES","PERFIL","SALIR"]
    
    var MenuPageHTML = ["index","crear_receta","busqueda","busqueda","busqueda","comentarios","index","seguidores","index","index","index"]
    
     var MenuParamPageHTML = ["","","usuario","misrecetas","megusta","","","","","","cerrar"]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if (usuario == "") {
            return 1
        }else{
           return 11
        }
       }
       
  
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "MenuTableViewCell") as! MenuTableViewCell
        if (usuario == "") {
            cell.icono.image =  UIImage(named: "cabeza")
            cell.item.text = "ENTRAR"
        }else{
            cell.icono.image =  UIImage(named: "cabeza")
            cell.item.text = self.MenuItem[indexPath.row]
            
        }
        return cell
    }
       
       func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
           let mainStoreboard: UIStoryboard = UIStoryboard(name :"Main",bundle:nil)
        
        let DVC = mainStoreboard.instantiateViewController(withIdentifier: "ViewController") as! ViewController
        if (usuario == "") {
            DVC.page = "login"
            DVC.param_page = ""
            self.navigationController?.pushViewController(DVC, animated: false)
        }else{
                DVC.page = self.MenuPageHTML[indexPath.row]
                DVC.param_page = self.MenuParamPageHTML[indexPath.row]
                self.navigationController?.pushViewController(DVC, animated: false)
                
            }
          
        }
       
        
    
   
    
    
    
}

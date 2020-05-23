//
//  BaseViewController.swift
//  receteanding
//
//  Created by German on 5/21/20.
//  Copyright © 2020 German. All rights reserved.
//

import UIKit

class BaseViewController: UIViewController,SlideMenuDelegate {
    
    public var usuario2:String = ""
    
    func slideMenuItemSelectedAtIndex(_ index: Int32) {
        
    }
    
    func setUsuario(usuario2:String){
        
        self.usuario2 = usuario2
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
      
    }
    
     func defaultMenuImage() -> UIImage {
           var defaultMenuImage = UIImage()
           
           UIGraphicsBeginImageContextWithOptions(CGSize(width: 30, height: 22), false, 0.0)
  
           UIColor.white.setFill()
           UIBezierPath(rect: CGRect(x: 0, y: 3, width: 30, height: 2)).fill()
           UIBezierPath(rect: CGRect(x: 0, y: 11,  width: 30, height: 2)).fill()
           UIBezierPath(rect: CGRect(x: 0, y: 19, width: 30, height: 2)).fill()
           
           defaultMenuImage = UIGraphicsGetImageFromCurrentImageContext()!
           
           UIGraphicsEndImageContext()
           
           return defaultMenuImage;
       }
       
    func addSlideMenuButton(){
    
        let btnShowMenu = UIButton(frame: CGRect(x: 0, y: 0, width: 30, height: 30))
        btnShowMenu.setImage(defaultMenuImage(), for: .normal)
        btnShowMenu.imageView?.contentMode = .scaleAspectFit
        btnShowMenu.frame = CGRect(x: 0, y: 0, width: 30, height: 30)
       btnShowMenu.addTarget(self, action: #selector(BaseViewController.onSlideMenuButtonPressed(_:)), for:
        UIControl.Event.touchUpInside)
            
        let customBarItem = UIBarButtonItem(customView: btnShowMenu)
        self.navigationItem.rightBarButtonItem = customBarItem;
        
    }
    
    func addNavBarImage(){
        
        let navController = navigationController!
        
        var image1 : UIImage = UIImage(named:"logogreenh")!
        let imagenView = UIImageView(image: image1)
        
        let bannerWidth = navController.navigationBar.frame.size.width
        let bannerHeight = navController.navigationBar.frame.size.height
        
        let bannerX = bannerWidth / 2 - image1.size.width / 2
        let bannerY = bannerHeight / 2 - image1.size.height / 2
        
        imagenView.frame = CGRect(x:bannerX,y:bannerY,width: bannerWidth,height: bannerHeight)
        imagenView.contentMode = .scaleAspectFit
        navigationItem.titleView = imagenView
        
        
        
        
    }
    

    
    @objc func onSlideMenuButtonPressed(_ sender : UIButton){
        if (sender.tag == 10)
        {
           
            sender.tag = 0;
            
            let viewMenuBack : UIView = view.subviews.last!
            
            UIView.animate(withDuration: 0.3, animations: { () -> Void in
                var frameMenu : CGRect = viewMenuBack.frame
                frameMenu.origin.x = UIScreen.main.bounds.size.width
                viewMenuBack.frame = frameMenu
                viewMenuBack.layoutIfNeeded()
                viewMenuBack.backgroundColor = UIColor.clear
            }, completion: { (finished) -> Void in
                viewMenuBack.removeFromSuperview()
            })
            
            return
        }
        
        sender.isEnabled = false
        sender.tag = 10
        
        let menuVC : MenuViewController = self.storyboard!.instantiateViewController(withIdentifier: "MenuViewController") as! MenuViewController
        menuVC.usuario = self.usuario2
        self.view.addSubview(menuVC.view)
        self.addChildViewController(menuVC)
        menuVC.view.layoutIfNeeded()
        
        
        menuVC.view.frame=CGRect(x:  menuVC.view.frame.width +  UIScreen.main.bounds.size.width, y: 0, width: UIScreen.main.bounds.size.width, height: UIScreen.main.bounds.size.height);
        
        UIView.animate(withDuration: 0.3, animations: { () -> Void in
            menuVC.view.frame=CGRect(x:   UIScreen.main.bounds.size.width - menuVC.view.frame.width , y: 0, width: UIScreen.main.bounds.size.width, height: UIScreen.main.bounds.size.height);
            sender.isEnabled = true
        }, completion:nil)
    }
}



//
//  MenuTableViewCell.swift
//  receteanding
//
//  Created by German on 5/21/20.
//  Copyright © 2020 German. All rights reserved.
//

import UIKit

class MenuTableViewCell: UITableViewCell {
    
    @IBOutlet weak var icono: UIImageView!
    @IBOutlet weak var item: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}

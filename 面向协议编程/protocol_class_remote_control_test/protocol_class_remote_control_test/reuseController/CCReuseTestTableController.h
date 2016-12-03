//
//  ViewController.h
//  tableViewSubViewReuse
//
//  Created by 何兵 on 11/17/16.
//  Copyright © 2016 何兵. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CCObjecgCacheAry.h"
@interface CCReuseTestTableController : UITableViewController
@property(nonatomic,assign)NSInteger linenum;
@property(nonatomic, strong)CCObjecgCacheAry* reuseCache;

@end


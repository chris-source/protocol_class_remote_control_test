//
//  DDBaseNavController.m
//  loveHoney
//
//  Created by deepindo on 2016/10/15.
//  Copyright © 2016年 hebing. All rights reserved.
//

#import "CCBaseNavController.h"

@interface CCBaseNavController ()

@end

@implementation CCBaseNavController

- (void)viewDidLoad {
    [super viewDidLoad];
//    self.hidesBarsOnSwipe = YES;
    

    
}

- (void)pushViewController:(UIViewController *)viewController animated:(BOOL)animated{
    //子控制器的数量
    NSInteger count = self.childViewControllers.count;
    
    //判断子控制器的数量
    if (count > 0) {
        
        //隐藏底部
        viewController.hidesBottomBarWhenPushed = YES;
    }
    
    [super pushViewController:viewController animated:animated];

}

-(void)back{

    [self popViewControllerAnimated:YES];

}


@end

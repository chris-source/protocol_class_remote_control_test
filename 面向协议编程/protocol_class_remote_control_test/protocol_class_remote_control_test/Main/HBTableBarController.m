//
//  HBTableBarController.m
//  彩票实战
//
//  Created by hebing on 16/8/11.
//  Copyright © 2016年 hebing. All rights reserved.
//

#import "HBTableBarController.h"
#import "CCBaseNavController.h"
#import "ClassFactory.h"
#import "classProtocol.h"
#import "WecomeAnimationProtocol.h"

@interface HBTableBarController ()



@property(nonatomic,strong)UISwipeGestureRecognizer* swip;

@end

@implementation HBTableBarController

-(instancetype)init{
    if (self=[super init]) {
        
        [self addChildViewControllers];
        
        
    }
    
    return self;
}


-(void)addChildViewControllers
{

     Class cls1 = [ClassFactory classForProtocol:@protocol(classProtocol)];
    
    id min_pian_jia = [cls1 new];
    
    Class cls2 = [ClassFactory classForProtocol:@protocol(WecomeAnimationProtocol)];
    
    id activity = [cls2 new];
    
    Class cls3 = [ClassFactory classForProtocol:@protocol(classProtocol)];
    
    id searchCompany = [cls3 new];
    
    Class cls4 = [ClassFactory classForProtocol:@protocol(classProtocol)];
    
    id me = [cls4 new];
    
    
    [self addChildViewController:min_pian_jia andTitle:@"名片夹" andImageName:@"1" andSelectedImageName:@"1"andIndex:0];
    
    
    [self addChildViewController:activity andTitle:@"商业动态" andImageName:@"1" andSelectedImageName:@"1" andIndex:1];
    [self addChildViewController:searchCompany andTitle:@"搜企业" andImageName:@"1" andSelectedImageName:@"1"andIndex:2];
    [self addChildViewController:me andTitle:@"我" andImageName:@"1" andSelectedImageName:@"v2_my_r"andIndex:3];
    
}

-(void)addChildViewController:(UIViewController *)vc andTitle:(NSString *)title andImageName:(NSString *)imageName andSelectedImageName:(NSString *)selectedImageName andIndex:(NSInteger)index
{
    vc.navigationItem.title = title;
    vc.tabBarItem.title = title;
    vc.tabBarItem.tag=index;
    UIImage *normalImage = [[UIImage imageNamed:imageName] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    UIImage *selectedImage = [[UIImage imageNamed:selectedImageName] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
    
    vc.tabBarItem.image = normalImage;
    vc.tabBarItem.selectedImage = selectedImage;
    
    
    [vc.tabBarItem setTitleTextAttributes:@{NSFontAttributeName:[UIFont systemFontOfSize:11]} forState:UIControlStateNormal];
    [vc.tabBarItem setTitleTextAttributes:@{NSForegroundColorAttributeName:[UIColor darkGrayColor]} forState:UIControlStateSelected];
    
    CCBaseNavController *navVC = [[CCBaseNavController alloc]initWithRootViewController:vc];
     [self addChildViewController:navVC];
////    后面要Push如果当前控制器没有导航控制器push不过去,在此可以获取navegationBar,利用生命周期写,更简单

    
    
}




-(void)tabBar:(UITabBar *)tabBar didSelectItem:(UITabBarItem *)item{
    

    NSInteger index = 0;
    for (UIView* subview in tabBar.subviews) {
        
        
        
        if ([subview isKindOfClass:NSClassFromString(@"UITabBarButton")]) {
            
            if (index == item.tag) {
                for (UIView* targertView in subview.subviews) {
                    
                    if ([targertView isKindOfClass:NSClassFromString(@"UITabBarSwappableImageView")]) {
                        
                        targertView.transform = CGAffineTransformMakeScale(0.5, 0.5);
                        
                        [UIView animateWithDuration:0.6 delay:0 usingSpringWithDamping:0.5 initialSpringVelocity:5 options:UIViewAnimationOptionLayoutSubviews animations:^{
                            
                            targertView.transform = CGAffineTransformMakeScale(1, 1);
                            
                        } completion:^(BOOL finished) {
                            
                        }];
              
                    }
                    
                    
                }
                

            }
            
            index ++;
        }
        
        
    }
    

    
}




@end

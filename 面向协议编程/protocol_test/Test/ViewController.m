//
//  ViewController.m
//  Test
//
//  Created by apple on 16/10/12.
//  Copyright © 2016年 itcast. All rights reserved.
//

#import "ViewController.h"
#import "ClassFactory.h"
#import "FlyProtocol.h"

@interface ViewController ()

@property (strong, nonatomic)   id<FlyProtocol>    flyObject;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    Class cls = [ClassFactory classForProtocol:@protocol(FlyProtocol)];
    self.flyObject = [cls new];
}


- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    [self.flyObject fly];
}


@end

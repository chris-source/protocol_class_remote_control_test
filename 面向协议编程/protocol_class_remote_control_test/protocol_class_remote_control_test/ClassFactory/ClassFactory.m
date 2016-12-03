//
//  ClassFactory.m
//  Test
//
//  Created by apple on 16/10/12.
//  Copyright © 2016年 itcast. All rights reserved.
//

#import "ClassFactory.h"

@implementation ClassFactory

+ (Class)classForProtocol:(Protocol *)protocol {
    
    
    
    NSString *path = [[NSBundle mainBundle] pathForResource:@"ClassFactory" ofType:@"plist"];
//    [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingString:@"/ClassFactory.plist"];//
    NSLog(@">>>>>>>>>>>>>path:%@",path);
    NSDictionary *dict = [NSDictionary dictionaryWithContentsOfFile:path];
    
    return NSClassFromString(dict[NSStringFromProtocol(protocol)]);
}

@end

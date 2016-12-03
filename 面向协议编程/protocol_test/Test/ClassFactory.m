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
    
    
    
    NSString *path = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES) lastObject] stringByAppendingString:@"/ClassFactory.plist"];//[[NSBundle mainBundle] pathForResource:@"ClassFactory" ofType:@"plist"];
    NSLog(@"path:%@",path);
    NSDictionary *dict = [NSDictionary dictionaryWithContentsOfFile:path];
    
    return NSClassFromString(dict[NSStringFromProtocol(protocol)]);
}

@end

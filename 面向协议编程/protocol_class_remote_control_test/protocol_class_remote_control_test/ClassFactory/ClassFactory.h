//
//  ClassFactory.h
//  Test
//
//  Created by apple on 16/10/12.
//  Copyright © 2016年 itcast. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ClassFactory : NSObject

+ (Class)classForProtocol:(Protocol *)protocol;

@end

//
//  UIView+UIframe.h
//  彩票实战
//
//  Created by hebing on 16/8/14.
//  Copyright © 2016年 hebing. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface UIView (UIframe)
//要声明方法,否则无法访问;
- (CGSize)size;
- (void)setSize:(CGSize)size;
- (CGPoint)origin;
- (void)setOrigin:(CGPoint)origin;
- (CGFloat)width;
- (CGFloat)height;
- (CGFloat)x;
- (CGFloat)y;
- (void)setY:(CGFloat)y;
- (void)setX:(CGFloat)x;
- (void)setHeight:(CGFloat)height;
@end

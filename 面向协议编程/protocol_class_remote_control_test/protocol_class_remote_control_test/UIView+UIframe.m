//
//  UIView+UIframe.m
//  彩票实战
//
//  Created by hebing on 16/8/14.
//  Copyright © 2016年 hebing. All rights reserved.
//

#import "UIView+UIframe.h"

@implementation UIView (UIframe)
- (CGSize)size {
    
    return self.frame.size;
}

- (void)setSize:(CGSize)size {
    
    CGRect tempFrame = self.frame;
    
    tempFrame.size = size;
    
    self.frame = tempFrame;
}

- (CGPoint)origin {
    
    return self.frame.origin;
}

- (void)setOrigin:(CGPoint)origin {
    CGRect tempFrame = self.frame;
    
    tempFrame.origin = origin;
    
    self.frame = tempFrame;
}

- (CGFloat)width {
    
    return self.frame.size.width;
}

- (CGFloat)height {
    
    return self.frame.size.height;
}

- (void)setHeight:(CGFloat)height {
    
    CGRect tempFrame = self.frame;
    
    tempFrame.size.height = height;
    
    self.frame = tempFrame;
}

- (CGFloat)x {
    return self.frame.origin.x;
}

- (void)setX:(CGFloat)x {
    
    CGRect tempFrame = self.frame;
    
    tempFrame.origin.x = x;
    
    self.frame = tempFrame;
}

- (CGFloat)y {
    return self.frame.origin.y;
}

- (void)setY:(CGFloat)y {
    
    CGRect tempFrame = self.frame;
    
    tempFrame.origin.y = y;
    
    self.frame = tempFrame;
}

@end

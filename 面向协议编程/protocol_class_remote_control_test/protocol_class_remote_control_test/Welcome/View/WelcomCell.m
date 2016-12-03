//
//  WelcomCell.m
//  彩票实战
//
//  Created by hebing on 16/8/14.
//  Copyright © 2016年 hebing. All rights reserved.
//

#import "WelcomCell.h"
@interface WelcomCell()
@property(nonatomic,weak)UIImageView* imgView;

@end

@implementation WelcomCell
#warning 注意
//[collectionView dequeueReusableCellWithReuseIdentifier:useId forIndexPath:indexPath];这个方法不会调用init方法,只调用initWithFrame:(CGRect)frame
-(instancetype)initWithFrame:(CGRect)frame{
    if (self=[super initWithFrame:frame]) {
        
        UIImageView* imagView=[[UIImageView alloc]initWithFrame:self.bounds];
        _imgView=imagView;
        
        [self.contentView addSubview:imagView];
        
    }
    return self;
}

-(void)setImg:(UIImage *)img{
    _img=img;
     _imgView.image=img;
    
#warning 注意
    //下面这种写法报错
//    // -[__NSArrayM setImage:]: unrecognized selector sent to instance 0x7ffa59c4e220
//    2016-08-14 19:00:18.448 彩票实战[47556:4127650] *** Terminating app due to uncaught exception 'NSInvalidArgumentException', reason: '-[__NSArrayM setImage:]: unrecognized selector sent to instance 0x7ffa59c4e220'
//    *** First throw call stack:
//
//    UIImageView* imgView=(UIImageView*)self.subviews;
//     imgView.image=img;
   
}

@end

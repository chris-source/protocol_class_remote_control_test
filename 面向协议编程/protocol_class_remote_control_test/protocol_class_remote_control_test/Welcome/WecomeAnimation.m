//
//  WecomeAnimation.m
//  彩票实战
//
//  Created by hebing on 16/8/14.
//  Copyright © 2016年 hebing. All rights reserved.
//

#import "WecomeAnimation.h"
#import "UIView+UIframe.h"//必须包含头文件,否则引用报错
#import "HBTableBarController.h"
#import "WelcomCell.h"
#define screemW    [UIScreen mainScreen].bounds.size.width
#define screemH    [UIScreen mainScreen].bounds.size.height

static NSString* useId=@"use";
@interface WecomeAnimation ()

@property(nonatomic,strong)UIPageControl* pageControl;


@end

@implementation WecomeAnimation

-(instancetype)init{
    UICollectionViewFlowLayout* laout=[[UICollectionViewFlowLayout alloc]init];
    
    return self=[super initWithCollectionViewLayout:laout];
}

-(void)viewDidLoad{
    [super viewDidLoad];
    UICollectionViewFlowLayout* flowLayOut=(UICollectionViewFlowLayout*)self.collectionViewLayout;
    
    
    flowLayOut.itemSize=[UIScreen mainScreen].bounds.size;
    
    flowLayOut.sectionInset=UIEdgeInsetsMake(0, 0, 0, 0);
    flowLayOut.minimumLineSpacing=0;
    flowLayOut.minimumInteritemSpacing=0;
    flowLayOut.scrollDirection= UICollectionViewScrollDirectionHorizontal;
    UICollectionView* colletctionView=(UICollectionView*)self.collectionView;
    colletctionView.pagingEnabled=YES;
    colletctionView.bounces=NO;
    colletctionView.showsVerticalScrollIndicator=NO;
    colletctionView.showsHorizontalScrollIndicator=NO;
    
    UIPageControl *pagecontrol = [[ UIPageControl alloc]initWithFrame:CGRectMake(0,screemH * 0.9 ,screemW , 30)];
    self.pageControl = pagecontrol;
    pagecontrol.numberOfPages = 4;
    
    
    [pagecontrol setPageIndicatorTintColor:[UIColor whiteColor]];
    
    [pagecontrol setCurrentPageIndicatorTintColor:[UIColor darkGrayColor]];
    
    
    [self.view addSubview:pagecontrol];
    
    
    UIButton* toMainControl=[[UIButton alloc]initWithFrame:CGRectMake(0, 0, 150, 40)];
    [toMainControl addTarget:self action:@selector(toMyLottery) forControlEvents:UIControlEventTouchUpInside];
    [toMainControl setBackgroundImage:[UIImage imageNamed:@"icon_next"] forState:UIControlStateNormal];
    toMainControl.center=CGPointMake(screemW*3.5, screemH*0.8);
    [colletctionView addSubview:toMainControl];
    [self.collectionView registerClass:[WelcomCell class] forCellWithReuseIdentifier:useId];
    
}
-(void)toMyLottery{
    UIWindow *keyWindow=[UIApplication sharedApplication].keyWindow;
    
    HBTableBarController* tabControl=[[HBTableBarController alloc]init];
    //直接赋值过去就可以跳转
    keyWindow.rootViewController=tabControl;
    
    
}

-(NSInteger)numberOfSectionsInCollectionView:(UICollectionView *)collectionView{
    return 1;
}

-(NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section{
    return 4;
    
}

-(UICollectionViewCell*)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath{
    WelcomCell* cell=[collectionView dequeueReusableCellWithReuseIdentifier:useId forIndexPath:indexPath];
    
    //背景图片
    cell.img=[UIImage imageNamed:[NSString stringWithFormat:@"guide_40_%ld", indexPath.item + 1]];
    
    
    return cell;
    
    
}

-(void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView{
    NSInteger index = scrollView.contentOffset.x / screemW;
    self.pageControl.currentPage = index;
    
}



-(BOOL)prefersStatusBarHidden{
    
    return YES;
}


@end

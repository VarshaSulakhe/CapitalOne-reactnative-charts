/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "RCTRootView.h"
#import "Sample-Swift.h"
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.window = [[UIWindow alloc] initWithFrame:UIScreen.mainScreen.bounds];
  
  UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
  ViewController *viewcontroller = [storyboard instantiateViewControllerWithIdentifier:@"MainVC"];
  
  UINavigationController *navController = [[UINavigationController alloc] initWithRootViewController:viewcontroller];
  self.window.rootViewController = navController;
  
  [self.window makeKeyAndVisible];
  return YES;
}
@end

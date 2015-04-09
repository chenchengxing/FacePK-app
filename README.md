# FacePK-app
face pk, ionic app

** dev
*** cli

- cordova plugin add https://github.com/apache/cordova-plugin-file.git org.apache.cordova.console org.apache.cordova.device git://git.apache.org/cordova-plugin-dialogs.git https://github.com/phonegap-build/PushPlugin nl.x-services.plugins.toast git://git.apache.org/cordova-plugin-camera.git git://git.apache.org/cordova-plugin-media.git


- replace below in plugins/src/ios/PushPlugin.m (or you will get 'enabledRemoteNotificationTypes is not supported in iOS 8.0 and later.' error)

***
// NSUInteger rntypes = [[UIApplication sharedApplication] enabledRemoteNotificationTypes];
        NSUInteger rntypes;//ccx
        if ([[UIApplication sharedApplication]respondsToSelector:@selector(registerUserNotificationSettings:)]) {
            rntypes = [[[UIApplication sharedApplication] currentUserNotificationSettings] types];
        }else{
            rntypes = [[UIApplication sharedApplication] enabledRemoteNotificationTypes];
        }

***

- ionic platform ios
- ionic build ios

- open platforms/ios/Face.xcodeproj

- open Target Face to Build Settings, modify Code Signing section

- select iphone 
- provision file select `faceScoreRanking development`

## faq

### if you add or remove plugin, you may need these

- ionic platform remove ios
- ionic platform ios
- http://stackoverflow.com/questions/27087018/ionic-cordova-ios-build-fails-after-adding-media-plugin
if [ -z "$VERSION_NAME" ]
then
    echo "You need define the VERSION_NAME variable in App Center"
    exit
fi

PROJECT_NAME=lastmile
ANDROID_BUILD_GRADLE=$APPCENTER_SOURCE_DIRECTORY/android/app/build.gradle
INFO_PLIST_FILE=$APPCENTER_SOURCE_DIRECTORY/ios/$PROJECT_NAME/Info.plist

if [ -e "$ANDROID_BUILD_GRADLE" ]
then
	echo "version name:" $VERSION_NAME
	cat $ANDROID_BUILD_GRADLE
	echo "Updating version name to $VERSION_NAME in build.gradle file"

	sed -i '' 's/versionName "[0-9.]*"/versionName "'$VERSION_NAME'"/' $ANDROID_BUILD_GRADLE

	echo "File content:"
	cat $ANDROID_BUILD_GRADLE
fi


if [ -e "$INFO_PLIST_FILE" ]
then
    echo "Updating version name to $VERSION_NAME in Info.plist"
    plutil -replace CFBundleShortVersionString -string $VERSION_NAME $INFO_PLIST_FILE

    echo "File content:"
    cat $INFO_PLIST_FILE
fi
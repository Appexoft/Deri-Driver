import 'react-native-gesture-handler';
import React from 'react';
import {Stack} from '@components';
import ShippingState from '@store/shipping/state';
import RiderState from '@store/rider/state';
import UserState from '@store/user/state';
import ClientState from '@store/client/state';
import CommonState from '@store/common/state';
import PackageState from '@store/package/state';
import BottomSheetState from '@store/bottomSheet/state';
import {ThemeProvider} from '@hooks/useTheme';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const App = () => {
  return (
    <ThemeProvider>
      <UserState>
        <RiderState>
          <ShippingState>
            <ClientState>
              <CommonState>
                <PackageState>
                  <BottomSheetModalProvider>
                    <BottomSheetState>
                      <Stack />
                    </BottomSheetState>
                  </BottomSheetModalProvider>
                </PackageState>
              </CommonState>
            </ClientState>
          </ShippingState>
        </RiderState>
      </UserState>
    </ThemeProvider>
  );
};

export default App;

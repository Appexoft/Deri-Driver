import React, {useState, useContext, useCallback, useEffect} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {UserContext} from '@store/user/state';
import {Input, MainButton, DropdownBottomSheetModal} from '@components';
import iconCalendar from '@assets/calendar/calendar.png';
import {useCommonStore} from '@hooks';
import styles from './Signup.styles';

const SignUp = () => {
  const [business, setBusiness] = useState();
  const [phone, setPhone] = useState();
  const [rut, setRut] = useState();
  const [businessName, setBusinessName] = useState();
  const [provider, setProvider] = useState(null);

  const {_signup, isLoading, signupErrorMessage} = useContext(UserContext);
  const {
    fetchCompanies,
    companies,
    loading: loadingCompanies,
  } = useCommonStore();

  const preventSubmit = isLoading || loadingCompanies;

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const businessEnabled =
    !!rut?.trim() &&
    !!businessName?.trim() &&
    !!business?.trim() &&
    !!phone?.trim() &&
    !!provider?.id;

  const submit = useCallback(async () => {
    if (!preventSubmit) {
      await _signup({
        name: business,
        phone,
        businessName,
        rut,
        providerId: provider?.id,
      });
    }
  }, [
    _signup,
    business,
    businessName,
    provider?.id,
    phone,
    preventSubmit,
    rut,
  ]);

  const errorClass = [styles.alertText, styles.error];

  return (
    <View style={styles.screenContainer}>
      <View style={styles.formContainer}>
        <ScrollView
          style={styles.fullWidth}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <View style={styles.inputsContainer}>
            <View style={styles.customFieldsContainer}>
              <Text style={styles.alertText}>
                Registrate para poder controlar los envíos
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <Input
                label="Nombre de la empresa"
                returnKeyType="send"
                keyboardType="default"
                onChangeText={setBusiness}
                value={business}
                labelStyle={styles.labelStyle}
                inputStyle={styles.inputStyle}
                placeholder="Ingresa el nombre de tu negocio"
              />
              {signupErrorMessage?.field === 'business' && (
                <Text style={errorClass}>{signupErrorMessage.message}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Input
                label="Teléfono"
                returnKeyType="send"
                keyboardType="phone-pad"
                onChangeText={setPhone}
                value={phone}
                labelStyle={styles.labelStyle}
                inputStyle={styles.inputStyle}
                placeholder="Ingresa tu teléfono"
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                label="Razón Social"
                returnKeyType="send"
                keyboardType="default"
                onChangeText={setBusinessName}
                value={businessName}
                labelStyle={styles.labelStyle}
                inputStyle={styles.inputStyle}
                placeholder="Ingresa tu razón social"
              />
              {signupErrorMessage?.field === 'businessName' && (
                <Text style={errorClass}>{signupErrorMessage.message}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Input
                label="RUT"
                returnKeyType="send"
                keyboardType="numeric"
                onChangeText={setRut}
                value={rut}
                labelStyle={styles.labelStyle}
                inputStyle={styles.inputStyle}
                placeholder="Ingresa tu RUT"
              />
              {signupErrorMessage?.field === 'rut' && (
                <Text style={errorClass}>{signupErrorMessage.message}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <DropdownBottomSheetModal
                label="Operador lógistico"
                placeholder="Seleccioná el operador logístico"
                type="provider"
                title="Seleccioná el operador logístico"
                optionPress={provider}
                onOptionSelected={setProvider}
                data={companies}
                icon={iconCalendar}
                inputContainerStyles={styles.removeTopPadding}
              />
            </View>
            {signupErrorMessage?.field === 'provider' && (
              <Text style={errorClass}>{signupErrorMessage.message}</Text>
            )}
            {signupErrorMessage?.field === 'global' && (
              <Text style={errorClass}>{signupErrorMessage.message}</Text>
            )}
          </View>

          <View style={styles.separation}>
            <View style={styles.separation}>
              <MainButton
                label="Siguiente"
                onPress={submit}
                loading={isLoading}
                widthSize="100%"
                borderRadius
                disabled={!businessEnabled}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SignUp;

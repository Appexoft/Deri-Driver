import React, {useState, useEffect, useContext} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {
  InputWithSuffix,
  InputPackageFragile,
  InputDropdownBottom,
  InputRadio,
} from '@components';
import trashIcon from '@assets/trash/trash.png';
import iconBox from '@assets/package/box-grey.png';
import styles from './styles';
import {PackageTypeContext} from '@store/package/state';

const PackageDetailForm = ({
  formKey,
  handleChanges,
  parentMounted,
  packageNumber,
  onDeletePackageNumber,
}) => {
  const {packageTypes: statePackageTypes, getListPackageTypes} =
    useContext(PackageTypeContext);
  const [weight, setWeight] = useState(null);
  const [valueInputRadio, setValueInputRadio] = useState(null);
  const [packageTypes, setPackageTypes] = useState([]);

  useEffect(() => {
    handleGetPackageTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetPackageTypes = async () => {
    await getListPackageTypes();
  };

  useEffect(() => {
    if (statePackageTypes?.packageTypes) {
      setPackageTypes(statePackageTypes?.packageTypes);
    }
  }, [statePackageTypes]);

  const handleInputRadioSelected = resultInputs => {
    const result = resultInputs.filter(input => input.activate === true);
    handleChanges(formKey, 'type', ...result);
    setValueInputRadio(...result);
  };

  const handleGetValueFromInputRadio = data => {
    const resultInputs = packageTypes.map(value =>
      value.id === data.id
        ? {...value, activate: !value.activate}
        : {...value, activate: false},
    );

    setPackageTypes(resultInputs);
    handleInputRadioSelected(resultInputs);
  };

  const handleGetValueFromFragile = value => {
    handleChanges(formKey, 'packageFragile', value);
  };

  const handleWeightChange = value => {
    setWeight(value);
    handleChanges(formKey, 'weight', value);
  };

  return (
    <View>
      <View style={styles.titlePackage}>
        <Text style={styles.titlePackage__title}>Paquete {packageNumber}</Text>
        {formKey !== 0 && (
          <TouchableOpacity onPress={onDeletePackageNumber}>
            <Image source={trashIcon} resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.row}>
        <InputDropdownBottom
          placeholder="Seleccioná el tipo de paquete"
          icon={iconBox}
          valueSelected={valueInputRadio}
        >
          {packageTypes.map(data => (
            <View style={styles.sectionInputRadio}>
              <InputRadio
                value={data}
                label={data.value}
                description={data.description}
                activate={data.activate}
                onChange={handleGetValueFromInputRadio}
              />
            </View>
          ))}
        </InputDropdownBottom>
        <View style={styles.sectionInputFragile}>
          <InputPackageFragile
            label="El paquete es frágil"
            onChange={handleGetValueFromFragile}
          />
        </View>
        <View style={styles.horizontalSpacer} />
        <InputWithSuffix
          label="Peso"
          suffix="Kg"
          placeholder="0"
          value={weight}
          onChangeText={handleWeightChange}
          keyboardType="numeric"
          parentMounted={parentMounted}
          required
        />
      </View>
    </View>
  );
};

export default PackageDetailForm;

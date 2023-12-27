import React, { useRef, useState, useEffect } from 'react'
import { get as _get } from 'lodash';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View, TouchableOpacity, Platform} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../../../theme';
import Typography from '../../../components/Typography';
import { useTheme } from '../../../context/Theme';
import Button from '../../../components/Button';

import LogoSVG from '../../../assets/icons/logo'
import EmailSVG from '../../../assets/icons/email'
import PasswordSVG from '../../../assets/icons/password'
import TextField, { IEventType } from '../../../components/TextField';
import { validateEmail } from '../../../utils';
import { useAuth } from '../../../context/Auth';

type IErrorTypes = {
    email?: string;
    password?: string;
    apiError?: string;
}

type IStateTypes = {
    email: string;
    password: string;
}

export default ({ navigation }: any) => {
    const { theme } = useTheme();

    const { login } = useAuth();
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<IErrorTypes>({})
    const [state, setState] = useState<IStateTypes>({ email: '', password: '' })

    React.useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: '',
			headerStyle: { backgroundColor: '#000', elevation: 0, shadowOpacity: 0, borderBottomWidth: 0 },
			headerTintColor: '#fff',
            headerTransparent: true,
			});
		}, [navigation]);



        const handleOnChange = (e: IEventType) => {
            setErrors({})
            setState({ ...state, [e.name]: e.value })
        }
    
        const handleSubmit = () => {
            setErrors({})
            let err = {}
            if(!state.email || !validateEmail(state.email)) {
                err = { ...err, email: 'Please enter a valid email address' }
            }
            if(!state.password || state.password.length < 6) {
                err = { ...err, password: 'Password must be at least 6 characters' }
            }
            setErrors(err)
            if(Object.keys(err).length > 0)
                return; 

            setLoading(true)
            login(state)
            .catch((err: any) => {
                console.log(err)
                setErrors({ apiError: _get(err, 'response.data.message', undefined) })
                setTimeout(() => setErrors({}), 2000)
            })
            .finally(() => setLoading(false))
        }

    return (
        <>
            <SafeAreaView edges={['top']} style={{ flex: 0, backgroundColor: colors[theme].background }} />
            <SafeAreaView edges={['bottom']} style={{ flex: 1, backgroundColor: colors[theme].cardBackground, position: 'relative' }}>
                <KeyboardAwareScrollView bounces={false} showsVerticalScrollIndicator={false} style={styles.container}>
                    <View style={{ ...styles.header, backgroundColor: colors[theme].background }}>
                        <LogoSVG color={colors[theme].inverseBackground} width={100}/>
                    </View>
                    <View style={{  backgroundColor: colors[theme].background }}>
                        <View style={{ flex: 1, backgroundColor: colors[theme].cardBackground, padding: 16, borderTopLeftRadius: 30, borderTopRightRadius: 30, zIndex: 1, elevation: 1 }}>
                            <Typography style={{ fontSize: 20, marginTop: 16, marginBottom: 8, fontWeight: '600' }}>Login</Typography>
                            <View style={{ ...styles.strip, backgroundColor: colors[theme].fontColor }}></View>
                            <View style={{ marginTop: 16 }}>
                                <TextField error={Boolean(_get(errors, 'email', undefined))} helperText={_get(errors, 'email', undefined)} onChange={handleOnChange} value={_get(state, 'email', '')} autoCapitalize="none" autoComplete="email" autoCorrect={false} type="email" name="email" placeholder="Email Address" renderPrefix={<EmailSVG color={colors[theme].fontColor}/>} />
                                <TextField error={Boolean(_get(errors, 'password', undefined))} helperText={_get(errors, 'password', undefined)} onChange={handleOnChange} value={_get(state, 'password', '')} autoCapitalize="none" secureTextEntry={true} autoCorrect={false} type="password" name="password" placeholder="Password" renderPrefix={<PasswordSVG color={colors[theme].fontColor}/>} />
                                <Button loading={loading} style={{ marginTop: 8 }} onPress={() => handleSubmit() } styleName="button button.fullwidth button.contained.default button.theme.primary" labelStyleName="label.white" label="Login" />
                            </View>
                            { _get(errors, 'apiError', undefined) &&
                                <View style={{ paddingVertical: 8 }}>
                                    <Typography style={{ color: colors.error.default, textAlign: 'center' }}>{ _get(errors, 'apiError', undefined) }</Typography>
                                </View>
                            }
                        </View>
                        <View style={{ flex: 1, backgroundColor: colors[theme].cardBackground, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingVertical: 16 }}>
                            <Typography style={{ }}>Don't have an account?</Typography>
                            <TouchableOpacity onPress={() => navigation.replace('signup')}>
                                <Typography style={{ color: colors.primary.default, marginHorizontal: 3 }}>Sign up</Typography>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { height: 230, flex: 1,  display: 'flex', alignItems: 'center', justifyContent: 'center' },
    strip: { width: 20, height: 2, backgroundColor:colors.secondary.default }
})
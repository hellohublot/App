import React from 'react';
import {View} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import HeaderWithCloseButton from '../../components/HeaderWithCloseButton';
import Navigation from '../../libs/Navigation/Navigation';
import withLocalize, {withLocalizePropTypes} from '../../components/withLocalize';
import styles from '../../styles/styles';
import userWalletPropTypes from './userWalletPropTypes';
import CONST from '../../CONST';
import Text from '../../components/Text';
import Icon from '../../components/Icon';
import * as Illustrations from '../../components/Icon/Illustrations';
import defaultTheme from '../../styles/themes/default';
import FixedFooter from '../../components/FixedFooter';
import Button from '../../components/Button';
import * as PaymentMethods from '../../libs/actions/PaymentMethods';
import compose from '../../libs/compose';
import ONYXKEYS from '../../ONYXKEYS';
import walletTermsPropTypes from './walletTermsPropTypes';

const propTypes = {
    ...withLocalizePropTypes,

    /** The user's wallet */
    userWallet: userWalletPropTypes,

    /** Information about the user accepting the terms for payments */
    walletTerms: walletTermsPropTypes,
};

const defaultProps = {
    userWallet: {},
    walletTerms: {
        chatReportID: 0,
    },
};

class ActivateStep extends React.Component {
    constructor(props) {
        super(props);

        this.renderGoldWalletActivationStep = this.renderGoldWalletActivationStep.bind(this);
    }

    renderGoldWalletActivationStep() {
        // The text of the "Continue" button depends on whether the action comes from an IOU (i.e. with an attached chat), or a balance transfer
        const continueButtonText = this.props.walletTerms.chatReportID ? this.props.translate('activateStep.continueToPayment') : this.props.translate('activateStep.continueToTransfer');
        return (
            <>
                <View style={[styles.pageWrapper, styles.flex1, styles.flexColumn, styles.alignItemsCenter, styles.justifyContentCenter]}>
                    <Icon
                        src={Illustrations.TadaBlue}
                        height={100}
                        width={100}
                        fill={defaultTheme.iconSuccessFill}
                    />
                    <View style={[styles.ph5]}>
                        <Text style={[styles.mt5, styles.h1, styles.textAlignCenter]}>
                            {this.props.translate('activateStep.activatedTitle')}
                        </Text>
                        <Text style={[styles.mt3, styles.textAlignCenter]}>
                            {this.props.translate('activateStep.activatedMessage')}
                        </Text>
                    </View>
                </View>
                <FixedFooter>
                    <Button
                        text={continueButtonText}
                        onPress={PaymentMethods.continueSetup}
                        style={[styles.mt4]}
                        iconStyles={[styles.mr5]}
                        success
                    />
                </FixedFooter>
            </>
        );
    }

    render() {
        return (
            <>
                <HeaderWithCloseButton
                    title={this.props.translate('activateStep.headerTitle')}
                    onCloseButtonPress={() => Navigation.dismissModal()}
                    shouldShowBackButton
                    onBackButtonPress={() => Navigation.goBack()}
                />
                <View style={styles.flex1}>
                    {this.props.userWallet.tierName === CONST.WALLET.TIER_NAME.GOLD && this.renderGoldWalletActivationStep()}
                    {this.props.userWallet.tierName === CONST.WALLET.TIER_NAME.SILVER && (
                        <Text>{this.props.translate('activateStep.checkBackLater')}</Text>
                    )}
                </View>
            </>
        );
    }
}

ActivateStep.propTypes = propTypes;
ActivateStep.defaultProps = defaultProps;

export default compose(
    withLocalize,
    withOnyx({
        walletTerms: {
            key: ONYXKEYS.WALLET_TERMS,
        },
    }),
)(ActivateStep);

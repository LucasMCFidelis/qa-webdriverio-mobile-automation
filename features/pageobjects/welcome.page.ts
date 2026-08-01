class WelcomePage {
    get addAccountButton() {
        return $('//*[@text="Add account"]')
    }

    get continueWithoutSyncButton() {
    return $('//*[@text="Continue without sync"]')
  }
}

export const welcomePage = new WelcomePage()
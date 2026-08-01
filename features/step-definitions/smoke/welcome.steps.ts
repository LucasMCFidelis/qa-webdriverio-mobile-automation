import { Given, Then } from '@cucumber/cucumber'
import { expect } from '@wdio/globals'
import { welcomePage } from '../../pageobjects/welcome.page'

Given('que o aplicativo Tasks.org foi iniciado', async () => {
  // O Appium inicia o aplicativo através das capabilities.
})

Then('a opção "Continue without sync" deve estar visível', async () => {
  await expect(welcomePage.continueWithoutSyncButton).toBeDisplayed()
})
import { Then } from '@cucumber/cucumber'
import { expect } from '@wdio/globals'
import { welcomePage } from '../../pageobjects/welcome.page'

Then('a opção "Continue without sync" deve estar visível', async () => {
  await expect(welcomePage.continueWithoutSyncButton).toBeDisplayed()
})
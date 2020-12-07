import React, { useEffect, useState } from 'react'
import { StatusBar, ToastAndroid } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SplashScreen } from './ui/screens'
import routes from './routes'
import { listEpisodes } from './routines/episodes'
import { useApiRepository } from './repository'
import constants from './constants'
import texts from './texts'

export default function App() {

  const [isLoaded, setLoaded] = useState(false)
  const [fetchData, setFetchData] = useState({})
  const apiRepo = useApiRepository()
  const Stack = createStackNavigator()

  useEffect(() => {
    listEpisodes(apiRepo)
      .then(({ data }) => {
        setFetchData({...data})
        setLoaded(true)
      })
      .catch(err => {
        ToastAndroid.show(texts.ERROR_LOAD_DATA, ToastAndroid.LONG)
      })
  }, [])

  const theme = {
    dark: true,
    colors: {
      ...DefaultTheme.colors,
      primary: constants.FLOW_YELLOW,
      text: constants.FLOW_YELLOW,
      background: '#131C25',
      card: '#000'
    }
  }

  return (
    <NavigationContainer theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      {isLoaded ? (
        <Stack.Navigator>
          {routes.map(({ name, title, component, headerShown }) => (
            <Stack.Screen
              key={name}
              name={name}
              component={component}
              options={{ title, headerShown }}
              initialParams={(name === 'home' && !!fetchData) ? { episodesData: fetchData } : null} />
          ))}
        </Stack.Navigator>
      ) : (
        <SplashScreen />
      )}
    </NavigationContainer>
  )
}

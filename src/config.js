export const appSettings = {
    baseURL:'https://e-learn.monamedia.net/Api',
    key:'VnVOQG0zODlNb25hRGV2',
    colors:{
        second:'#fd5e8e',
        primary: '#fd7e14',
    },
    selectStyle:{
        control: (oldStyle, state) => {
            return {
                ...oldStyle,
                borderColor: state.isFocused ? '#fd7e14' : '#c0ccda',
                outline: 0,
                boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(253, 126, 20, 0.25)' : 'none',
                borderRadius:'3px'
            } 
        },
        multiValue: (oldStyle, state) => {
            return {
                ...oldStyle,
                backgroundColor: '#fd7e14',
            }
        },
        multiValueLabel: (oldStyle, state) => {
            return {
                ...oldStyle,
                color:'#fff'
            }
        },
        option: (oldStyle, state) => {
            return {
                ...oldStyle,
                backgroundColor: state.isSelected ? '#fd7e14' : state.isFocused ? 'rgba(253, 126, 20, 0.25)' : '#fff',
            }
        },
      
    },
    UID: 1071,
}

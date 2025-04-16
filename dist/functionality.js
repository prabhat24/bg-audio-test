import {
    AudioPlayer
} from "./audioPlayer.js";

import {
    returnBeep, whiteNoiseAudio, playAudioFromFile, loadAudioBufferFromURL
} from "./audioContextImplementation.js"

try {
    var audioPlayer = AudioPlayer.getInstance();
}
catch (error){
    console.log(error)
}
var timeoutId = null
var playSoundTimer = 5;
var playAudioContext;
var delayDropdown;
var audioEle;
const base64File = "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAsAABcEAAMDBERFxcdHR0jIykpLy82NjY8PEFBR0dNTU1TU1lZXl5eZWVra3BwdnZ2fX2CgoiIjo6OlJSamqCgoKWlrKyxsbe3t729wsLJyc/Pz9TU2trg4ODm5uvr8PD39/f8/P7+//8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAUAAAAAAAAAXBAqM3QG//vkRAAAAa0PTZ08wAgzgfmjp5gBE7ChL7ntgkK5FCV3PcBICn3wAfv48h+EEHoMhdiaEsenOo4ycQyICAAghh5NNgGFpgQEHCAEHYnB/qBA4UDH8v4IcuD4L24ACvV7+Q5BbBNCWJMNQPxhLedbknDodAgACCGHgMmUAwGnoIBiCBzg+f4gBCUlw/8PgAAAAAACs7zxYkAAAALEMBED4wfwTzJtAeMNoOQx1QpDAnCbMFYbcwfwGjBmQ/MN8GcwqhrTHTCbLSmGCUcYGoLJuuDFEwrqaQyYq6MUD00ggeFCQBEUnO8fTAglwTPRpPiQlxQCCA4JSaFA9yYCdWgR0TFW0+8NA0AZO6aIj+ue/zS3yxl0Oxt5ZipjcjNnLX/nz/uT9a7eJB2lbFgAAAAAADBXXNUAAAAAL8MCcFow0Q6zNjBRMMAek0SwfzA/DRMHwjswnQMDCCUfMOkPIxPCIzJVDDBwDJkDlOEoL5tgCiDwsg6BBgfhQGAAGplkgzMBDow6CGnnJH2YyF8XNepQwGGneMBAcwWHDDABYMl6yXBYCGU9E5WFP3EizohASANGCB1OaB13YgmefmH4FmqlJTSHDmWFNrDuVi3NXbAuHdbP6af/7//+59QICb9sgCcxkKO6pzXsMTBEDBoDwqBCgxfgwJAgYAIw9IA1bwUzWKExkDMwWAFeCAILSShCOmA4QCRC2FEfx4pmLXQWkmkgmgtFN1IoLPKlTqrT2Y6bse/61LSda6rKW1TLQUkqigme4WPkFmjFzi4+MaoAwAHL78AEyTI4XMlRU0qlDHYODhEDgopdIACCm0MTkQ0jpTLhLMRAsvi7jLiKoF4iJwV0BGhayMySqCKydMEklOyZqmcdHQTZVFEvIJIT6CLLWtkGupJTUNS6LqQZNbWZ6bp1MhoMydVG5wAUYHd7UQAKBhrMWxjS1p5+GgOIcwMCUBBgYBgClUAgiCAiDg6O5NIGl/EhAgdXjJ67doVPzzts0VXeW1fsqSuduw3KyCHg4YvPlhxEsjRwIS7SNEu4PoOXINGyoyd32x6Z9L3ifk9V0839dNE1oZIHA0xIWY8upjS8hb3K4tfUAWQFANd7UQAoBJmgbJh0zp7MfRlYXgoHGIBCYbCTbmBwgPB8w+UTrmuB1iAwcSSTwa+4bImJYSVn5ekDoehMO12Rc2yX0pSMgoSEw+eZjSOH5807rtFrnLCScG6/vO77kLHtOV/9a/5eXZA6OBYEoQOwR2MYL0r3y10ANAHATf/RgJWm+xoCPWbV//ukRPOAA5A0Sj91oAhrRylq7kgBD/S7H06xNGHoFaQ13jB8Qxg8GoIAAATEw8EQIEIkMBAwxASD1azNLCIDAFE8tfKKRAgDEvGQh4gB5rDy9qIRAixKGySiHMuZ1oUGeNgIAAGChlYwVyE+dk2bNBRSfTaQS/pt/Wgr3QvfjRRUqyQUg24yxIe19XpzH3afoAAACgOz2IgAQBgwpxvDCyF8NPIIkIDYMCEAUysIJRYwAMGRww4WNSXj+Xo7hAMgBy74KA485jT0dJU+DJK6bDJn4lFPaASLGXLgeFg8TGw2PWYqSgYEjERUwcuBpDKbsOwhGRSobUfNe5QbgwIgEBAIsFzK1TxdBBEc2vCbP0/394ArAKQ0/1aAHQDNOjhIZfOyjyMDgPFQOMFxJFQkJgIxY9FA4mJj9FYzgnSWS+a9B9qs15gUPSlQFFmvGr3YFiEufVdr+4Hwr53HGFRKK2wSaTLs33LLI0ZNMiRqdNTLk9Kol5TnBG8wsvUD+Th43uXKNw3f2YSKMj1AZCSy3R7v0f6AC0Q6nd/c0ASAKYsuSSysZVJqYBBsKhOYIgNLzBjF4qLCRIH+g/SmEzculPz6ykEz9PtEWClYpoEZzqubb5KYrCbKAiJUR1CmMNkC//u0ROYAA+QtSWuPS8qBpUj9e2kvEEzXIa7tJ+HfFyR13ST8MYAoPEaMItoDSSpyCqPZyyrr+UsrYVbddGpBd3i6IKjioaFnbGnmCdPUojrVAABQBqML/9WACYAgxCRkjCmA9NI4JA1AFIh4DFa43rMNC2KFBGeTlhC/IE9C4zJ1xQ4h3uITwRAMOpzB2efjauoHkmWKrCo/LPOMpYmrL4av1TrDxm6xo9atd5dWFuFVerE0p/1Zr9Ly/5cZkpLCNfWfwAAEAEghv30QAMB8EQxdh6DClIgNMEQMzaGA4emWhwnSYDCxeIgAgiEoUiZhYFrqD5EeN05wySZzQ50MNA8dx7qt/GcKR+IWp5WGDVDYDXhyZmdma36uxHa2RvnUNJHF83TQnkCWNFgvcRo0bdcXp8116y53WXUF7MggVQz2U+r0bOkAAkAGgV//9aAAAC5geE4mDMYoaqgQ5mwIGDxWY3Ew8FzCAiQCNIBAhN2RYIHT/xFFt+oLcdhDUJ4WAJpAsLRdNSGYGVWGSyViKrjSlQnn7mtISc/XMHkDlJWpF0VHTxcr1Qcmh6vLfp+v/xf051mHCQH3BISJFSMIEgCTheuuCQxv/SAABAD0q//7MAAwBkxsQ5zAvF3NGML4wUwDzAEAqC1NFACBaqLi6zVYRNcvxFNNVT7M5OX9gWHGGIJigspYxJ++jwJ8UJfa0QTUPRIWoTdfdKh+yXXcTrmDxeodth6sgjRXur2NK/re/ddWj7LGOOz19fymbZ1Z//ukRPeAA5QtyPvbYOqChhj/e48ZEGyzIe9xg6H9mOQ97TC8GksJHhz///+tAAgGxXu+jBBgFgsGF0XIYICwhjJEImEiYIhCaSGDKTF4ABxoHgEYOCxsWIjQifoWBrG2mKQ3HTW6C8oC+GOlh+HAzbOtH8cV0J4/GkTnrfrFzWlUtunS4px1iegia61GW4rLIqLFs2yYMt1+z/2enK5fKbtecrM26+tvX/biZx4Ny6ipfaA2AIMieP//VoALgWbuDqYz1WYvqYYNCSYGg+GNUiUUBkIQABwNLXMOxABRTXmBtRlL4zjVOzUWSPBQDL3p7t1ALhghXFYUAEBJYxNhQlmjxDQyVaKwIYrSJlZLkZqyQVlmRkw03AV7TRY05raLto1qdv6nX7el6KG9Y0monOHv/qAA4E5Vn9hABQAeY2JophAqGG4GNycmhGQFxrBuhAMhYspw6EJZjFUUXbXFN2CR9d0SoXsreYBRJd9D5eFc2zzJ7KTZu8xTME9mVDKMjJhuQhI5rZyy9boLhHa4/eTueZqxdvbf1/ew9Ukv40O8Z1qlLCLTV6+xzL9lKhTFpdOeAAYF8v31iIBgQBxwnNRlhHp/8FwOL0KhSaOEUBgFHSRAEcoGmjzcjMkHBZIs//u0RNmABDk5R+vcYNh/ZzkNdSalD/C9Ha9t46IrHOO13TD8V/IBVieGgtS5pZgAiI7bszf5YZxpZLqWKjiE9bLmqrDAgE9jVsFSs6VGldo2O5MtaMG1TttbeYXQNuxvTXcf/4f/oJb3dvs5X62/d7tm0uwsY2hdYwsnqR0i+70eVQAAMQeBCXewgAwMQIDKGICMVsGAJLTKBfgEBYYfoEbKk3xEYWyTETlUjAhkizHAFD1SKYDQdnWU7QMsV/K72+DSQHDvo14+WWV26owH1StMGbLHT1Sfoca5YeSqX/uSupZTjPsWe5H3QN9Nn8LigDSl4YI1WVFUafdz7e30gAMBbK+6tEAECKZwXKYsAmeYFORDIBRIMSDFUAmxQFlzGBIUGMqaGOgDI5qtb9/GkLXdiOs1L6GIA2bsxulIRKHHniYhMkhGiQBpEsrBE+KBEk5A0Q2gtAhs1ydlsjant2T6gn/uUmHwmFAu48gLkC4NCBLBz0PpVacOIG3Xez3oAAqH7k31iIBgEALmRqAeYPKFZsHi7GDWBeYCwFJt5kVGkzfgwAVDB4UrLEfiIbKJbSccSxGoIhotJbcO9aQX0Or8RTCrbuwLWmfb4yJh29Glle4rrC7Hz6G7LDVWb/7D67H5vs+7d6dn5gJm1DAOVNLeRWixr5ejpAIIB5Eu9ZABgSHRjlSxgWpRpkS4OF4wSDY0TGIxfF8BFMY7kWFx8MigQMxZrMbRnMAQKRpkVC5JecRAlEYuxBG9Z8a+9mUV//u0RN8AA+ksx3vaYeiA5UjtdwlnDxi7H69pheICFiO11IqkHzq7MxGbTRhhA2mQE8iEjmVSLkLSE+I1Tb+rqs5a452G6RK0lXsbEoilh+08pjX96Xen/oT9z936VQAKRdb9/YiAFgKzImC/MBdTsxYB4DAUBLCgDwfskwQBRlTIBCAKFzLE0IUmSq1t5D7jxCKs+bZ0obJQSAIKdp7g/uaF46LT48xrst0JePiEO6zjgkmK2E2MbELbNP5OxXl+u5FqFb+tt8+IuBgGkAhg4++onFbXqvXdXa77QAABrJpvWQAYEBebDyaYqMEEFiYBBCYbByaRFQCgBEgNAAamDAEGJ4uGwUuGlIRAoEUOTev6s9rynUWRVXQW3KhFTsNpLaERAHIDUGAqSvZGS+tE7jkhQ3E4I0JKA0420dLEimmu3AgI9aXb1VLd93sV8nkabE6xZwVU0RNA7COGXSljpu5gvmbRddnsVuAACQBWNdt7CQBYEAyIycjEmPdN5wUIwjANzAxBqMDUIkMAGMVCswYB0NTAASMkUYHGBVwsCEa2uLoft5KCBowMgMWBTPHygiAGTR6NWbl9Vyq6YPtEmLrhI6rFolJVQMBp6AogP6g1tG6jA7GE5MEjKNm/vtRNlZZOlMULnXlYletzEH5cgTLHXNXdi9BToAIhCs++9iIAYBjuSsMkxgzOOVRmAiEYUTqjgkEiAMDwAMCAA4nIjLQYLfpEKxtMTEcuTS5/ocCwLUIQicB5pF4FQiAq8QOc//u0RPEAA+oqx+vbYXiORdjddwlnEei/He9xJ+H+F6P1xI6kcISUKFpmQRFTRhNx9vqmnIGQqKFROjuDsaa8mFVMgsBZFLb5ZAw6SD70AiyhJLHLe1jmChT0JTqVAAZGyW/+rRBgCANmGIQ+YUwkxs0BOmDsAQYFIDpssRBAfMBAokBSloFC5m22hwn6peyxr7b2IvhjVdtdNNRX9sm699+B9ML6kijagy8tPQmunZbcXuJXnE/6r07iMcOflrfmuxzs71I+xzQc5nLOpIwwvdj9L7evxuFez/Tf7snf1/fxAIgG8+/+rQCGBy0zAhLHiSqYDAgFB5scWFYBEh4YIDEYCwTEVvMKA9SoLglHRh6t7mLHgx1cnrBgDCAUxSD4zSQ8VWKxEaMkgulo24iLFzJU7YICBaRaJshSJh66kT5tk42qqIbFb8+5HuDCADPCcIDMJCoxSkgDJniR7/+0AAEMJhi231aAMAcD4qkiGCUh0Z7A0JgcAhDoL5qw2F/TEAcTBBQWMICo0R4mqQ6XWZbATmT7qO3ATcWdLGt598jGxwqNIQyhHqD44UQJJMC06iXatEjaNULH2mGiSzCx2KGBIsc1ea7MW4zLLte8ZqFIfs8TlUrb85xhkvqqlC4GUXAouwJLOf8UVHgAIAZ3f+xEAKgSaeLGYwmydTgATDGYIBWbSJxekmBpIFREADAoeOMNIz6BS/KunFtt3e6pPyiGYogwseDqZ5kAkRxmquIBIJCcILtqkJaMUCAEieAr//u0RPGABCAqyGvcYXp9xfkNcSalEXznH+9xJeIZFiO13iS8Qi7HQlBCKyGDF6piKLFrKIWcu4bkUCyYuDax4ZgASPA7AbHmMAvrdCxY+xOroWn/0AAKBdJ99okApWYZ5MJgfoQGaeLiZFGBhIUGyiSHAwoQxikItDCwKMC0MoWKQYkBFrsQUChMC2F2VwvZ2az9ea12/YrLNFdHUsFSKSaAwwXSNZWVxtDq5RZKMHbYt5ftWRpJJXz+1FutY2o1wwTPkh6hkmPFWAw9pI4IXngQUWaC7y/2XRb9egABgSJXfVkAEAMGWcFGCMImq5qGDQqCCQYkS4gAAYIxoPl9gACjks0MaBRJsICC72UFgS0iV5cPoIjJ211Kg/LTzzyboxJSH2Eo4dMnQ+Kpw9tlac89cuPVzOleFDYo273OuXbrSULMz3CQ4Gg6EAM+waRgGoha1Tla0703sTdPP70T1FwAEA2N/+sRAMB0CoxjhfjDnHQNgEEswfwADAMA4PNOVvAIMFQdkBgIKbCmID2CBAu1hY7A5Y6druMTchqcXtZmAVUAOI8A0iRClGaSTRkJ4uXIh1GiMOaZWkianByMpK2GsjiK3XOXh6j3xeXGNJtYEBViAi0SCnozrGq/6f/6QCKBeVEADAIHTDVjTEplzkAtjGghFhebFDw0EwwUBABIAEIRCZwo4ABriIypzRNy2gOirSsGwKBkh447EcG9jy5MEqpi2UDSI/VEk7HW7vIVG3F8JzAmdmBPrq3lWLf1//u0RPWAJDoqR+vceNiEpXjdd4wbD+yvH69tJeHzFyO13jB0phn3OpD0/WCfl1IfUpjiKxGCwdfvr6RrNN38n+kAAFIGhF//1aAYKYr4OpggjpmiiHEbceCDZ/XDT0zjKC2vFRKeDILPI2XYaO0wTgEgg04yKVg1vJnRssLTx1AdnqImwulaM4MzRa4gH1y8ifSo2GluuQ0daZcSH9G3LLFq2DpvbLtuXm16Zam5/TN+pmfl/3J2rsn4vFhwiIxZn+//9YAFgvl/31RARCMkkIMLBWO7gRCBYCoLm9GzZRwGMIEkDASBmFZBioFAqumWyGOUDWffiEQaXHZ3D8uxJA7KpVqtC4kllyIuJYPX4f2Q9XlgyjWOH2F917V+s6k6KPdcYdXQ3ptKdNH4syGDhClDjo44FgbjHJQOkKJx1jve/6gAPBPrtvYgAh6bMB6Yf56ZypgOFoWGwj4UIMjMQAAhcAIjQ0uFASi/ycMKpDwL3yoHS84EMMktnyefXOUSxFdpQgxNnZAszMNYkXsVXuwl559MhUejp0TfL7e/Xr/aa/tJmj8WdLY8qGdSk3t7E/Rfof//1AAAwg0q9/+UxNspUx5mjuixMJAglCBtH7sKCmcKKNEI00M0IS1hoYut7YcdqkiEDRhKlzBIuobAtI95hW2i9B1jQsaZ17hsRiCeiJglRKqKmwdi8ocFCspjhCZ7LWKqX8xVh6Cv7lsFV6HvHDbnizaxiiSk0er6O130VQAMA+5vvYiAYFAAbNsY//ukRP+AFBk6SHvaYNh+pej9d2wvDoS9H67tg2HpGCP9zSS8ZKWmfrFsYlASYDgga8Pxow0NMRFmIGChZlmKRQSnDF20i7d34eyklctdIuZA1vHbQ2msGBSHjRkLKkioYMnCAnCG2sMnnBQlP7EskXTnsJRYYcy9fxs9LZ7vUhqDIq2PB04WEC2nRQQDVNGGd58e9GUvi025d/16wAggQeETf/REAv0baKJkXFHz1SYvDgwAwFFlngKaatwsIIR5mp4cTU8im2kLxbpKIJjcYd5Lxi1DUpT9WK2nHvhcEhX6o9Tue0pZTcgVVuHEZSKzi1mjTJ6VFOL2bVXPq65T+1lYwLpOAIaAGCwUOyJU9vaeRHpur727f/pAAAAB4I//9UgAYBpl81Zi4KJ/IKYYaB0aDwZMEgUSB5gMFmGwK+BjGjGCgCTAcMEgcA0NG0Lro5lv1ggAuR2U2iWfLT9SWy0WxEfJDDz93F6GT+U3KSVdHFZdGpjQ3MOqRL1anT3bnLVr0ovW2is5eBG6/YToNj4dXAzjYIMLJCbXG7xR9dNzvUAACAEwib72EgJzGW5kGJIHAujiJyMEGzSDpXoOQ0XFSBYSEcE1KjSuLLts0T30jRIAspAkhtaO44uxliAz//u0ROUABDIux2u7SXh9BUj/c0w9ESS7H+7xg6H6F6O93bBsSlYQxpIRbP4ThzFB6g9zBcKhnGqSHS9blV0tMvLr4xrMfsx50859/ximdEYaWmVT7HD0Cj3ClVJulFi/7WfFqNYAAAAElD//1QAEIMGGq0GCy5HCBRiANCILhGMQcKTA4kMRA1rpkEcBbfkRGT8TWganS3TVgCow6LTY8CGDVYzeAY2K8NpDKBGDKOB6BgnJsO/oF+cUSZVhNhfYyat84EMT2wXRvfazo1c833sGqFnVDWzy//+z///rACCECLSf/tGiCAFmXF6YdnJ3dHGIQyYCGBjQUs0MNhECkFTQwyAvUKJ0MbSUqKr6rouTGlDx0jXofqR8mE4vPCNGmB4UeZFR5G0aabVsWKpSfTHpMhRZBF0jd4XnJdEai01GkhIMGiyyCwIPWIiwPuWJUJU9jniVT+W7FOoAACDBIhbv7EQEjTHl1QtChnCUJgODhgGE5nUHJJmJAgYWD5CBQaEzEOoGl8NA0WCzeP2nu6EPqLKPwCmUkmknqT7OkbmyFYXBZGOG3E5wcCylRGiswVi95QVl9YWUIJTLGpYmoq5Na29Th4NyvzxW8l3xuV55/XG6AftMFnUyxVPjWOFmv/t9QAAIoNKxp7YQArYQygw5pTvCsMJAstsaTAKUZ1CpngFMHeBDyFu007UbgJbDjzjhPsVQSya/k1HLcxGsLDYlFkczb2kib3E+LNLo5ESJuaF6eT0+que1ATY6Zoqd//ukRO2AA8gvSHu8SXh9ROkPcwlLEQTTHe7xJeHfleO9zKT0Ta1WUfk1sSUcD6BhRZ5an2N/zgo9r41SEaqKqgAORP79/YyAYCgkZxIsYoowcBgyDg+MAgbMQgsRFIYzazYsCnAtmC0FRo0M3chaDhwzVbnKFJByS46W3UmUYAsXHJHwuYRllAzoJGOK1yJc62hFQeFSqEFjKDtq0iVg9BeR2oyycd3Uqu6lDwzy9QvPs4UnQPOCD7A0EJ/69yQAAkweFbb+tAACASY/m+YtDudeAARCqCQZNpIelQ4CtygGIg5L3GkcYXuyJx3XnGj0UEyhzhYIyezFZ0ExK1mNF4DwJBE0LI+5zhUcDImKjooSkGkrli6hGTvbQLoUsn6UY4GMHRw0MGAuNCiyIsQWIRze5vT3Cqbv//U7FwAAQgeUaEgLlNKyrBIJnBIlGCYAgAIjeClYRjJhpKGBYJDDBKEBCbsK6LsNzXWwSSymzi6ReRZ+cZ8HQoKxSgIDiNshA8ydJWCwaFSIqJFYD9GUpCZA0qNmoNmo5A4rsykpedS+7sp9N+CQoxwqwcOrLJFlUUhtrBqskO/Fv1rABBiCJZ9/9UQFKjRheMFPo9EczDgGLAOPMjaYNHwsLUvRENlq//u0RNACA/Y2x+u5Seh9RPjvd0kvD+i3He7tJeHoF+P9zSS8Hgy/S7zxtPdx5nUlzsP830sZtB0euoBSSjyBCwe5PA2sD6JVU2XaxhEeXPg/pdK4NthjHkRqaUEMl7YFeyitKalsXV9E/oEMrUoUc2IhVPtv79v0eqoAIFIHpm2/sRAUrDQCYlWZsshA0DmARgZ9E7zmBA+DQAiCAAkYiPAOAzupQMlgBgLN0BLvRCMPGzGXuXI5UjMaOLpHmmDCjlcOAGemzRYW162BFtkqocb7LUObRXDva7SxI7UoqeqK1uX+Ww4wKAILPXdUWvQx7v/SAIFIEOs//7IgPQaFA4xDjQpjMKiYwOBDNoJY8AmDqUQfMhc/YhLSH1yJrvQ8Uvf+alL8N3SoZ3ALgvoSpGYFB1RlVQeHxMPWoTiVkxFcSyULCRJcpop1Sra3bQLxUbdvTTbYYgQIVrZuaaO3rtSlCE2aNe4ACkbu+/WEAF7DlbYMNOsxcGEYASNzLpOQ3MBBJADDAKAppsJg4eu8EpNKqGMlpUzENkJEM9xZ5ntpIJxtzihD94+usLmeVcsiuTzIp4KkSCOMLFojy10kPv4DgBI/Dj6VR+oF35nt/KCLA/KpMFFU0rUDbdoNCvrTQYoT7mPACCCB6NqiAv80kbzGKOPbgkxiAjAhHGITIQ8YBgK9gUkMtzAxGAlNXil7JnUbBe7DjxtPZvLI27oWiC5KMIEwGj2BOZbXRtIeiYLDK7xyaaJiZ5uxIviK1D1E//u0ROMAI8c0x/uJHUh0JfkPcyk9D8i/G648zaHom6P9zSS8XVxDT7ysgVYmxGbLttFGc6yPuGy+Rei+lrn70wmz/XUAQGEKqJ3/1aAVROAvRlzHrFGExojOKAFmkgaNDz8CEMOmOVjQKgGVyzqBGks8hqmiYwGiQuhe7sLfUNo6Wk0AhUs3I0ElTKDAuHyRALxOFpUegQoyyiC2PWZ0aIoGaVNIZZC7tP+/Ie++lxbNLxi+s0Yea0YAAULgEdC/a7e1EBZRmVnGCUOebKBhkCmBgkaWDo8ADChHy01TNFBP5PcxxWNpj/srdyGos1zB0091vN1+yNPHSdbuHSYfQige11kEr0PmiyZ5EQySG1FosMRxAriGcriywvTKtZFQuiWSancJpAEKGlAcchIENgVcmHJ9U84QzNEXRrtlPssAA4F9/21ZAA6DDOd2CyDGpwsKIjAYYOK8Agfl6H4KoTO+qwWEFvutQ08apn6uR9YEQQhl1onAJwM3hIJxsPTqzbHK9gSj0qlQ0K+lxLY86gN7Q1fK1Gy60yXKHKOrEa8tvWrzdhglDhSEzpcqKEgRceYJKSMBFmEhi3XOMsYAGNea/xdAAQOgJDvb/ISAIAWYQe4gi5gM4AwMmCSgcahp1AY3MFPhQlBAUb50AIIglgTx1I3J2czqplzKGmBizfsvcmLY2VQvXRiA2gJdD6iwDgMJRtGQCVRAnFtrWyUHii00WtRlNdbYeeTOOfKUMjlLiIVQ9TTK50u1zjakBQaO//ukRP4AA8M2yHtpNSiD5fjtcyk9EIynGa5hjOInlqN9zaS8YUMhwCKexJCtxuV2/T6VADCCCJZf9rESEbTCd8wQ1AYIHBocfk6si0EPJgga64XDz4nVVOJI8ulK4q4jxW3xcWUK9d7tHcAUHgGMg/BgGyRo4PKrjqhmihv4jOSA2LNPNtNA55Q0nsFbhk+1/tJFQIBIMBtpcVmRAFGG3C9zFIvs2JqttHlElwAAhQV1TX/REBN4x40AIjzkQOIggKj5pp4tcGGAskGIhKGZ2pyNPrJk8XPfxkHKFt9YXAIro2+h3VyAXSl91HwL1aEeKjmTgnD8f2UroFLqUlRT57V1eTF8CxhJasS7odratYKsu92tBBTjDw2TPlSKCtqBSWBOaY/Huzn/a5AAAOQPCr/tIiAgiNkzhQSBd4zgdPzAEZsIqNBhcysdHjrVAOAn9UydWACOB4L1vVIxODKGhwpWpDIn6aFo5weR+skM3o23nHzyhylNVz61ZT3G0gMVFDiyHUhb2sDVWMmpoCo4ZGOeTeLNLhlwMHZsoVdYhv1dXZqqAY0E8fu0ZACEk1qzTFQUOnDcxEADBgzNoAgeAIMCyFxeIeAZtx8goJs0WPDkTAuBBGvcHoAIGB/9VitS//u0RNaAA8gqx/tpNSh+5djvc2wdDyS9He2wb6IQmqM1xhnsapUR5oGM4q6dr3nScbLz0cnnlqHEAtI4cTN5RKECBtWRo2YNs1t9bnTm5t09dqZm14TLJxGtJR8+1d36gsqWLVLtpVv58Uq3KgBAcgmXf/+xoh1TfXUxBqBbyJEAYaAdBVYAhzFrZ4MOnwysPKi7riM/cWAMYap3TfdPRl1+9Wvx8MR+LUa50oKCY0XlJpt7nY/xvXdhck9pg5cYt793YoHc/uvWlXbNqFhPSxOmCg2W3FhM6w+uf/BAMRbZ1Guv/0DOmb/wAAGAIhm33sJIUCOiLDDV4xIvdYcJiU/fQMB1MqoyBG21BQP4hcmDINBwA+uIyQuB2LjoqtB+Xl/qmjo4hP0JCUFtiCM+LCeqXiahuFWzZ44fLE9Nx8o2Y904gHdvdFxWRBiqMnY3Crzr1pHIoMMYq0RMSZizxYla0FjDk0UawAAcAh3b7+xEhYY5oaBuMaMTuIQmxiJ3DxhII5tJLhGyimUOsiSptUjzRSUtxlapE7YHl8P0pkERmOZushClt69l55uFRqotFT1ElFpq7e5WXJYTpNOxe+ebRG5G7ak/sNZzepLfjHIGhgCho4PURMJjmE110qRWoVFEOVDrWf7NQAYSYK6rvtISA/B3Z8FCgbHwweMVGTrQIeAzQjYGLQgARI7NQ7SJOhCv2zU4rBAVmNB4OAZsQ+jM0x7CZITD4tqqOtJVitySyOyRDgNGbnkSvE7jaBBx//u0ROmAA+Ypx/t5Yep+hcjvbYZvECS7He3hh6H4F+N9thn0q6dNBrDUnEMrqhJqP67+qBA01DVyDaVixJdhkMRJAS7o/n5ajT0d9QEKRtpfdGQAVAAbnHQzHDj5LAoSAQrN0hAaA4EBQKEK+UqTHpERJpG3WM7M5KbTtuDDxCCmNTFHS20xUJAGuBkeXFgvJKI8fXPMJz2/PGRkZMrKrEpnZHV2OxNddR88hPQsvi3egojohYsXHJiNaQeoxCSDK9PznmeZ55EcLvMvvSPSnFxiK3i6Cj7GhG9n6EgQhBhEI/++rRDCz3eTIqTUvGrhZWbJUy00owwg5no6WMLR4MBEBkoGT3YZJn9cjvdRpy6kvkzqLUQlBwaVSwUKxOTDS1pLoW2E0JIwXIoGsRpeQencsJ5oF1leghOpSdSzqoxKSWX/c8n7VuM6bHvmheYsxBx112G3gn655iqm3EegAA6BDvNt8ec1IizE5MPWhkMCwoPzc6cE3aDQLTEMxE8sUaYotZrKq8PyuLQTBC/CwEZ66TjcH1WqBArJyIT5AcCBVEaHT6jDDy1TRICQME5EPg6KQUAsUIQ+va71omzjb7Xip45mY55YCg4gwFJY6EhU6gGEsPsTVqW5G+wesgSS3oADBQBpZ//tmgGwGXyCAA2IEDgEGGhqQu0xU6H8FIITXbsSRXeT5baxDj3yjClllCsK70s3FhC2Iw0s20dIYihYXaYQFFRotWr2xKTaTF84q5BSYXN2kkCuIROTYzZS//ukRPoBBIVMxeuMHUiBxtj/a4lZUGStGe5lJeHYGSQ9tJqUXf+TqAyZm7LPqlCAxjyyiQpbMlhr+tq1ADCBCZR//9UiFtGNzkYDMZw0DBA7FhAAlayQGliJF+SqEDbFCaqVTK3qbRmz81s+PstiJ2bVVSfLCYgDkR1hWXK4T0TiaXh5fV9UrVPTBKKXDF11fV84PMpGsS1VUecOlDcvtWZcap05fdbWCzfZryUVqMUB5zp6o7ZTy7v+/R//zt/yABCABYZf/9UgEyQrYgBQNyBysABogbCIriFlxDN/EiyK0DDN5Frrsft110QGuPw8FQMlyBf1KxU8OzKuIyaPDqz6EYuqFS+LXjctwPwtVTwMOD1Q8lmHmkzQlAsVfZfWVXtQlWLiIcLJ2JMJMUi6BKBGlBRvUVuoACJyCIRd/s0QFkmLQIX4zfzgRhSR8aVitIwIMBH3JGRpk4avcldvwyuBMDehTPSwE5wjafjgbjVF47WGZ2Eil9IYLCqsVun0bh1rDp9dmNlU3BMal9C7y0mLd1jAwzaGmthIVBeEjIXNDQhIK7Foh0v/euKdn9NwAQ04vCL//aiAhONKrjAYg103EYIKnpmacw8L3BdNZYHENPABRQ6mUyluExImQSuM//u0RNIABCAvx/uZYep4Baj/bYaLDvSdHe3pg2HxFqO9vLDkC4AGwu9aYnKGTGIyC40GZBHeJDZlfS754aJC5Rp5/XLnCVqUKB6M3lRZbEtedW7zka19zoHuAaAmJgcFjFqKndTMkUA2Ld3b/qv6VgAxiAhka6+wkB4DAqQKeZ5B0YYWDjwDnLPIlqgRVDG0Xm+qK8omSyeXL0Ya0MIyqCo/PLEhuw2V0bzhyUiESHxILJZYhY+0Ssrk0uHas5WmemWL3oMXNPQMr3n7e4rYjmjTD1upPQCZrBzVqGNAUaAS5RAXIpZA8gqsRDDIqdx/68Be4AIGgIdV3/0RAh0zqeTAIOOShUOdGECguS1YwYMhEmfjGibmXYObIV0M2cUoqC6iUdgC3Ga4cFnSSSkpYWrSsUFuKRrSXUKSa7dEnOLlVw7PWEcFCo6vX0Wsb6QsILmfXrfWaWneibnOtnbP7PPOd15aS4bfYNRY53Y38VoADKpCXV/v7EgF2mNzOYaLp0QEEU0CtQoSbuDEgQTCjY4I43uFtJMrGsiRoTlDmiwHQiPbIMJCIPGJaEYeGTApHZjC4ePnzhayIxTqbOFVw5PlV7efrawtXXPRVeYay08xj1+yL5m/VcicyoKkmIaWJAsHzQx4BFRYS202Uri3/6NtwAgwgREv/7ljGmA0YhSZx0PGQwOACQc78kLgm3HFgU2dTYsBL25cdWTwu3SQiCHZIkpfH4FpTQvnRHODMJh4PFyGwtPh6fPyscj8hoUs//u0ROgAFBwuRvt6YNh8xvjvc0wbEES/He5pg2IDF2O9zLC8LbzBX4Y41zzpZOz2hr6V69DpdtLV52O35O0xsDpDADNGDBMVatsu1NqVm2Tn6tly/12V1QAxkwiETb7REB0jIw+MBFw50ERJgoqNhHVC4EwYZiQgImqzMFlhyexnIQGL+uiaPcsXYTFwrXcggJ0Kc4K764exDIJ44s5rD2z75kYcuZXlwe7PNnrhGWuRktyA4rkdb9kcWzWa0x/RXDoZIGw8HBekLMdK0KUV791Hb0f6QBClgaYbf+xEh8ji0IGc4XSiAjEIQZOSTwIEzERUwUOGkkz1kGj2RJ4ttLBaag0PRmDwwOR1PF6JgVIHobJXchbZM0Bu5keVSxVPjYrD2hQHLQ/4kovePoV9MjjPG+rVEhkjmwK2FYMzQzY/9YDAyrrmRBvi7JPOnGpvh1a//aAEUmETU/f6pEYGji5gFMb4Ul/BkSMgNfQeUmCBRtPEzdt7LI8AiFNEGYxmHnJhLI6erHmfOiPSEapgabJ1BlGgeTkGqIWTxYiIm+qnMQICBUgJ/jz6J55GeP26KlxLPmnUJ3CGyw0xDd7T4sAjgYSOjJ1RYTTsf686i7/rACByB4d/rrWiF4mVjGYARpxwXAYQsGBQF0JBULAluAoDQAy1h4EVXaY24R3bL6EPwhC9IeVWwpkzKI8uVVrlDGGMmiUcH+DUqMvgK+s35uFSW5zhsdRXL0U4mJjn6X6ZjhYRkRO8+EhcMJBBj2Kk//ukRPQAA+owR3uaYMh/JrjvbYN/D5S9H+3pJeH1F+P9xhnkUB00dQiohPFVma4v+ntVAFCjCYud/9UgIsaIEmA1BtI+YKLMmEleLDQgIBC2ChYw48XvxdzQXKg3XUtEbRIKMMExABNzh2GX6JQ9MjZm20RkjQA1FNUEtEyZEq5/m2PktKWwq8jnD0p2opm0SMjw6AhNSkojrrc7WZV0PvlRSKijVZjv/DXAAywgeon//ZpBmBik5GEhkCzSJFgAgUrFrfmGggYfJEZCoUMUIgSDVVHKKv8/rWn+gWWxJ/nvRpljvx0bryDi58vv4kaZPalnIboT3IcAaAGzkeIsDltMLOd5NcNRR6fhOik+kn4K+AW0mGiZWhBcTl57tuc+f/s/+a3eK5u3an8ABCSCIVbr6ySG5GSRoYHOxzUCiQoYNmTGRsrIjCSWBwAyseRWiscLQmLxquOzULRSPhyueWFaMkvHrgKqjG6N1Oy0twveuiOnrtmCDfMVlhxtVzHSzmstsNx3mc3pmaTALrC8/cvxcIvNmR5ASA5CLnjGmRg8EElggfedRZ+0AjgTx+6RkALxAMVMLW46YfzFEh0mbRBAJjQwAHP+DAB8QYG+RdejjxQFFo5HxVIi0eTFU5I3//u0RNaAA7w+R/tpLUqAxfkPcYalT9C1G+5pgyIyHKL1zTBsHgTVbyt1w8BssWLjAqG61YcxetaNJoe/JTirj5SYiiX6xj/tJy3bkN12KvM7NWbZR+Psv02jn6Xv03tkvCwtLCoJVMStDoiUBU2Eg4QPi2ieVQ59AsUVAGCkCZWN/7WgJWZQdmEkJ7IMaWCmTEYYwPkVRURjTCkajCiBj2KpHll8kn3tu0ltsqznQqORCgVGCAoiaHohdRRgBzZNNkKihk0Nnn3BkiPE5GiYmtPHRnmpIrVtg3BHBqsT33CR25wpLFmnJk/+Elj45a4IH1i4H/VoADKECnZ9v5CQAuBjIyUMJx43iYTSlDDJjxJWOF53EQaIGIjmoo3AALJQCGcah2Aq8MRJVMBAsH9YmdbOkwHK4OlEVl5PTGBNXLEi02YKzBs0yW2y2vbaUnlfYp9GZ+lGtxuteczI57IdXASWcGLxxI1Y8WSXcJUnS7m799a8anp2adgAJW4RKRvvIkQ2QwtgEMGbqQK3kA4fUq6DlREIJdoCJG6m+cWXb2NN85b3Y4X24wOwWERN3kyCU1hZJJ2tpWF4xDZBhhaRYN27adum7hp7EdWaLYXOg2DquuUp8FFnMxQvXnemeii7j4iQfYUeFBI8VWTAahYOCcx1sBlEo/FGf9wAITIzCt/vYkBmZZMJg8nHnwSRCJNwyCAYGXSFw0VQaY5FRlgFkwasKxPqt4DY5R2ZfHEKFCQ4QB3OTZYSnxcC4kGixSWV//u0ROKAA9g5R/tpHViC5djfc0wfECC/He3lheIDIaO9xg385US2cSqYOwSFaGXWIR2WPyftaycZelTVP1YZVZuPDDGZYIly0RnalSIz8q5FeIv8ha064M+pybP+rHoAUagHh63/0aIfULyRjebYcZYWZF8c8K3xkgosLEI8MdGwBM23nrP7F6GaesqusOpVH2osPE8SNxMKkRoLgGMkh5tkaEoFqnDJG9CKhCzaarK9vXcNIbJVTBF1UM/6RzMlLItdoCJ3xYaKqFWNkgAVQLtQPWESTY21gt33/1gAhJhLs939iQD3GdBAYjUJ1kZCQTEQRMLhDMueyJ7xgLmRRIzbbTG9ak2aX1OxatCUf21ntTDB1lhoLAKGEKISmUZGQgIQmhAmDA8Qo42dOyOhJAuZp6qV2QTVvKLonpg2lpnohlUYQxzpnJG5mtPdlsEADHBY/FTudWr6U//ygAIygPNP//o0hKjFRBAzJ/irBCVN2ObcwwZy4ZEB0Fi2hX5bVJ+dSeF3ORCR8hkO48VoBJQTFyMwKka2moCNWIcOIz42ZQcZeksUkMJoJsOOITSPS58ncFBDd0nFTen4kRJiZtZqPoJntQ0wVtj+3mfK7wEs5ZV1nL3UqADCWCHVfdpEQGcmeRwCIyYNLwiC5fEWWDNA43o9OsYACJloHwJTvQzddllhy67ULAOGio7PISWhmJULWraxWLTZdWFg/WK2DZ08qWTNfWV6R+M5hGAyy0g9q1BSVE86KROrlb79i8zI//ukRPCAA+0zR/tJHUh/x6jvcSOpD2ynH+09LOoEG2N9xhn0Zmj7bncgZBFALTCZSKqFwgheSXsAOqimWgAwpgqZb7+1oiGTRr0fAHJTAETM2gKKmXAFrXqMwCOUSlFuEyJWArF0fB1qFzoGSgwuKiGIrJqWSSeQr27xvFKpAWXGMZgWWwXALsNSQGpCrcyyD3oia0sIWTjKLvMfPeFUe743fdOEqC4wTAy4b8IJFAi8BjHuqRmtwAIyoRMv//YiQoqZGJZgRUnHhQBgqKhoKJYKElaYFGAhh0WiJEnYopysyGFboUwGOP4thSNmxOVBLJ3ID0pIAfPCcSm1o+nDaYtrExYKTTccT+sR2SLn/6AwOLKXPajeZvBQQCBoPB4TQpYfC50wBqhU2UW1VQxfF2JDzkLfr76VABBLBURH21rIENG4JEKIzgOLAxIcIK8gCJl01BB5Mc1m815Gp/4W4cepZq3WauHgPBCJJyp8OjISYjBTEthYJR1QDVrXiXUbCQEBEBiZ4bqR5yHks72OlBCshPCzzzBRSBSKV0B5sxXzFMHhMkqCptQh1ON7F4r/1gCAxg0POv1qRDSDEpmMGAo6EDQMhAMOw4/M3KBIhA+w6CzFCBLp1ifmAvo527kT//u0RNGAA9M0R/tMM9iAxRjvc0wvDxjTHe0w0uIGF+O9x6Wdi2SoTcYCgiF0IolR1tpsfTQHzS5cV6CnIkOlETUGg8+YiUJUO3qIlkfVdq/dbK0S0cpPEFoajFqbMdD7cFiHsNhMT2ZmDm9IWMP3RXdfl2MfvnUAEJMJl3//taIqDbZUQEq5eMtHKPDwABT4pCwCbmEP+vNnE3G4lHa/LzZkzI7LIhDcp0wg8P5LWdImNazQ6JxaOVUWqh/SoaRaoUqVDNiDB6SByYQbswRnUnCDJQRZEIWdayHVBEBDzKp7ebHZnDbs2d7fP/f0gAm4A8K231iIEZEcGYJXHbIYUACUZNITk5RCCJ/PSgQMAgBYWlqX0VrlcPhN9teKCF55DC+fD/rqgmLFXH1iy4WVy9dGeiUZMkpYzeXXFx9q1iSCUCjiIPJZMZkcPMoqmESY8s0Fq0EAgBBogUfPEWIQswCcs5unF/+9F38XADCiCIh/r40SJWb4arULTnOMKjAa55zGEBls8IoGC0ORbSqcGw78Pu/N1YNW0jS7tufkwrD6BRVE8KkesBsQpEYOLOYVRTsYkRFgmabaKnmiG3sED4cxh9+wuGqmmZ/XRCEAzTzo1jmKldU62w1X+n70e3/rEVT3OXAGCVB3dkjjIlgwWuODLTSSgywsMuBXkMLA0Xm0DjkDM5QMQOlC47uRKlvwO/8eaoMR1P2qIxLeRDmuJq0syVDklLDsOtR46TqvtN5MC1a9h4xaFpDTnTtsTnyx//u0ROSAM7E1R/ssHTp95mjfbYh9DzDbG+0kdOoQIqN5tg5sdc50ggYMHKzbID2OokZPmgKZb7t//nkx9Yr0WuTWxB1KK2KhZCdv2tUCAqQIlo+/1SImDpkECpIBWJEzkijKKogSXcSGnfZI+Q/MMXe+iaw5csCYACQizEPBEEYSy46J5yjwwY36n5BE9e7yHU0M1ZIRXbOkKEluFw9tDdacL3/etDdvV7r7+UqfbBBDl2VLcig1ThRiXLoNnlj+sqMKzutrH3nyf+kXrACFKBEvH/+jZF0yElCpQTu40XigoZuBv0g2KgEkMDCzBD9e9IifIXDyd197E+/q+k+dP/LH9KHoASjFIZKmoNjRAQWJGXkZkGQRGBsSuymCjomb6Z4URfVoB1DpQXHzud/yPivEFGnaxc4xlNzlhSZ7nqomMOOEe1SMOoqrAHCYCYh//9WkJkzJ2YiXiJoC5E3ZATFKzgooZGPAdvdLgc6YOi2hsCknmxXN3ykT0h6T3KluEnKRyWsp41BuOjo56sZv1GSq46o/0JxFYKcciaSJnmMeQ0frUfrGbuy51qbP7jNYsOtpAz0xnQ5f3lFpRf2Nzr6oFtx3ZygClTBDvH31iIE8aECGFn5244ZsGIk5nzWZjzgVZCEOFCBkKiQVVTJjsnHIHilYvh6QiZGWSIHzwk3PBObWvn7dl5WbIUDZ2vbXKmOfWudEhWOX2oXjxpQeqY6wsu0Pr5mWj7tf2Vn13razu6+Eng0wkGD4u8eGE7Fo//ukRPmAA/86x3ssHHp9KGj/bSOpD5TTH+ywz6oImaN9vTBsJ5VzaHdf6fSlAEWVCId/f9ESI8AWgwIIsqVpLIMNHgIQCYkXBAiIBSnMp3chmYOCUTT41MhLBugmzsyJS4yEVGok+hO0cpi6C44OMq6Lz0vdc+XrrJidFBG8pLVCzlW1C/kNQcoAEtqhtSsqdyEA+6OnbXvoffLMcEEkQw5Qu2LWmP1tpSAQUGESs+7WpATpryApXISgEXgYKJWZAxlpUqHghFiKAkHpwMmssIfZYXu9NLXUumJwhkoPhRdDAZR+uhPORsGSMyrb1j5kmpdRkgQvSaQqICPUKBe9F8nksTQqNz1dXfqaUHk9jubUsrj5s2kKMAxBJw8VUX9/9WvUAEUoERL33SIgSkRvxhUENXsEYYbDNnCIAA6rDDEE1jNMXjgBPucjTOmULocS+59bOiq03w80QpliMcAYkWA923SSAmNzJB1U8+LS57Gabe+WT1paUuetTGkF2+mWJUvUmp5kPstYeJYXAhAPoC6EKkWuae6GqsTkHfuI6gBWlAiHj/aVoh6TMIxAzBdgIahcUY9SsM0EAAnkMGDM9NUnSIT38kfmhwJJUuNKI8KgdHg9k9UaERSYJ1DJKP6I//u0RNmAA+MyR3tMG/h5hvjvaSOrD4TTG+1hJ6IHG+O9phnsLjL6vfQ3zcDbAsCcegTsl2fB8mKHyh0SSBdmsclzjr57GPuN62W7bFVFLFTUwMAXInjpk+8DkzLyZFazAqNX/60BY5oJeZs+rJIfYwy4RzjOgxkQFWZowVOqoxFKw31Y0yp3L66FjsaYLMMhpF8NITZVmkwnHQtrYHx7Ky55U77a64knQ7rT4bG0DhIOOfGKdMoUnybGVtD3qo217HrQ830d+4HwJpNYe2g3dRpjDOsWw9YFwbp7e67id0nnlbf5zu7///n9IHiiCYqP99UkG6GXnJeA9aGUEmjZvGTgEYYgNBqHg7MdqrAC15ZYP2y+GQCCyBs5YcS3gSnK0iHWHiBhKWQk2tljdlpeac3Fn8jii6CEkExxAkRwUi05KWN2k2a2tyMLb9+p7PvcATIuoMG30lViqzbzjbkMFwkALMsExD/b6tIbMdMhME60rhRU6EEcIYQ40gg0MWOcxNi8YmBOXiESTcBRMTyUDqAuRDQTJkUFCagyycm2vFZuCFpxKgFR1p7JZxo5OxVR55v4uIZLtalGWr30ksyCitk2SQKDYCEpQD+GzLQMeYH4FDoYSHCoscQE3I/qAIakCXWPv60SKoy3HFxlhIARK6McTmTFBTPDXGSFMzPZraBikOWZ1qPNLpPGcU6KZXCiUOOQ83KdncVJZqfOJ1vTnX5oylfr9WW79/aqwrFe8By91RgGKI1vK//vH+Tf1to4//ukRO2ABCgnRvtPY6p3Jlj/aYZ7D3y/H+yxLKHrl6N9p5m8woaULHBlDk0HxbYq3FRkdePcODLJz9HQAIiFCIZ7t7ESKYzwhOsnfDW8xzMXmJ0RYqgXNMavMCmjdpu7iLnDJ4fEh4eEEwGspMlNOzzjdjFCUnI/ZEtYO5hqnuzDi4jKV48PsLLp+acs8sdTUlY+tRpiAraDjgjazBpFJ7chSosOQi22Pv/cj0XxsRjy+YGi49RBKDAc1Pd9JhLSwPDvt/qkQuY0lYQmgimbkYKNRcFH2VKHoOgJUaYYx6iW9PWoDfJtAPBxUREYqEwuiEKwBno0J20kZgcnbgXLCKwJGqJh08QwjTZ5zRI+YKNAqm2YgxNHJsDEhgwVhwku5OHZTSLQzZHL1/17ptRbmF1W3M6FPc7i/H25/dgEvShEPHu1aQGA03HUoSKNSVMIBMwHjEABCxKswRAasscvsQkWbiRd2r7z5PCMmhyQ+EyYJBlEkiQKF1OO6EiW3lCOuZJijbUsGtTSkgckXkqlSs4LN6RR94hyq3AbNRLKVuS18jM/MpKOsEAYJB9RMV6sNraygUbrT6u5xBCzATDR/9Yica98b6DWzAJOIp1S2aW4yKDuDlOY5modK3I4u+fh//u0RNIAFAtDxvtMG/h/RmjvaSONT5jzG+0kc2HyIKO9lIqsuahESYNdpp+wxAkGBCThsEBGSD4gC5ZAiVXikUJHQJ8IUmE2j7ZLFcow3IkXyaceoibqFOQUrOtUxVrLKis7J/YnMitRlW84woeBAcTtjJBS0hOsmxURp6kLeJ//1aIuh2Iz2WaIWRAgCpIiShoqMqhs3xbPGtIqJfZ540Nqh2yenhloEugl131iDxTAfIydzKypgESdVCdgiHxtpiS6JHQUdIytRMhRj8UGJqIknQx6bMOZqD6FZ1c0pgkUBKxQkdw3OtQUarhD1o1CMNBg7u/21hIFsWqBVWa8QZEiBHBtGrgKDqnsDgUyU9w6iV7xNbOCuvRlpsBQEo5WEpEJ3mGkNecojt1aqPTwusqkRx6sm17T9YdPlhPVSvTHSdftG9XvncFEgIIjD1gIho4hw8SbFmIdLP3e872YiiR4ItC6hqXPe0iLKvqgVmqXooAHSUCYl9v9UiMDLEGJQzwtaQVD3kgb5H6LBUM1Creq8laeKE5TDgqIYFAqLPq/KmjmJZzWE/QUI2PiXsJycNmRC05Stn+RQGtlsZkjXcy47CWzFpi66d4qd+05jYn4RNuJuowaYjZ6qxfAZvE0N/0jv46x28cnc3H9/+/gBKyYPEP//YiRgbRCkwzhpApkwxXDe9QQDDnRHQAihQ9jQKWiqykIa4mG0CXjpBcSDiwRUJSJptqdW2cJkw/riBGaGV152nP4dKpPhq+1SnWx//u0ROMAA6szx/spHbiDJ8jPaYV/D4S9Heywz+npFyN9jTBk5yrT8MVdrAz2/+O9NogIDQYD5sQlziS1uAhzzTmjXOScQfRccTeK+lQQWJYIl4++1SApTIVGCSPhJEQvG3nt0WKg8ykxBAtHB2beNLbxukMsoEAMicVBJECaM6KlhCRnypOfeGSM+LihldAkWQkx4PoFlESEkIGERP4ScNomiRQM3vaGzmXGSXhYoYrwk0KJXB8EQC5LlPmGng+XCCXh3V/osXv/zYhDOwQ7x/vYiRHTEXWSUqk1gjTO5yKvzdVyBjTTpajk03jk2alsTjhQNYHOWka6FCJZksLReHApw1KorPD01mqyPmT/lhg24aE+ApFVk/a7rO0edW+rTHczjjO2rau4cw5aaIKzuyekNHil5ye+SZutn2nn5Zn9IwiEVjFtY/3bqdQhJxARER9/IiRQGBPJoDYUHXDUtSMO56DCOTisALIvfeb6SQbPRF+LMGzkucRm8DQ9oOxAJLroipnTx04dJ56Qk61QTYkvlo5eKDEQYmiBRKdzJhTuh+69MiC1RNoukByYkJKWABwQUEC5GyOUdGKARNkUY46GB1t6UANe3u9KJTPATLNPtG7GBvCBofIaaIEDERokMQpmDFA0wJwHOGPYp9s0dhpTAIVAgiC5Ogsexbsmcb0CAwBo4OlWDiRKXgS22wRMORLOXo+qti0uZzNfSbq1sFQtIEM/TiFm9XIVOkZkV/LDcbGhoNAdRwuxkm8esa4d//ukRPmAE+kvR3s6SViByYjfZYOPD9i1G+0w1KHtnWN9pI40X2dJnf/qADR0B2hvto0QLo4uMOBJLKCV0AxNzS8kUWAoJtnZWUES0LkdR/Ih6D4DETTRwVQyiLYkGOJzNxfEdF5l0erks9QmLp3S4rOtPzYpWsCbBMKME51q6FBAznWFF1pL14KpkOZBgGDTTgSE6gyhBAVvNgefn6aEAyFmO7x1XOErSKTlQmHj7/RoiqIeklke0GCIRGaRohKaPGisZRRTb1PvGwmLZsyZQlOpPPR5Kysijl6ayWjxLrWhbswgk2FcPqw0XmB7F71rkNfCmQljMPtF0zPTf6vQxdK0KIQFyyIblmZk8pktIQCpkLFBAYcgTtGjBoDNmGrVOoM1C7vt9ZlIwwREx/vo0hEgpMQ7JHgE41OyaidYQtGGg4kOhs2q/WY1YGjjcn8ttVJA8PGjQJDaoBFEZFILoyJY6w8qjUIoIyiZtREDTBZZ6PWjJAcRY8scRNQMuWuML89tcpVZk4yVtUUo5Jh73nTQ2t/+3smQ4LjFNM5IQp44J6pltKLwdpDhXUHd43/1RIdo3pgqoL/hzwUnNBKZjCpaND0RF0tidmJmVSaXxEmILkh4uFp6iOXSsPI9Dofo//u0RNsAA/I1xnssG3h+5wjvYYN/ECT5Heyk02oJHSN9lg48lIlqlbh8Pzj7q1QctpTuE9KjQ9kweSpVaiVF+IdHS0p9c6vXdSCFiCFmJtdPxPt9ujYP55WVzJBjil+LiggeM154o296jDtX7SqKIWR5CIh9/7ESNmCqQsDZakwtsbCM5FnsTmNMwmbuXgZJCcHw6Et0cBzEsXi8d1T58WE9B9PcK50d8Yo1q9K/JncC5OqdRUSByCFoTOiokYQpQgXKkozkdh5bFJlRlu7nGTX3beg+XGrFQsL1xA9CJxKoiOLegkswI3zP9/ucsyhWYIdn39kRAsgb9noe8GDgAo6i4pBWau06gYFLrxTMajZlS8vV+mOgnGpiuuoXqswsoakVdOrV0qGV84NCxRQIpmW17B9LEAZ8yidZMURQimAkTpNSsiX2NhDCrXucp8uAgUBcuHwXW21pAvEBJ5i1CFsPHW90ppsf2s1/Df37/SNCjNYiEIIbPJriqQNHv0zJdoYDBQswgqK/Saf0ZDSFA5lsjCIcXcSLyqCghmKcgMJjsiCdGzpwOpM1AHBriSleUHSlCIaWAuXtzFlevsluZPnVUK0lgb6SHY6maUcOTtXPsIMTGA4ReIQE2A9uww87COgqzTZ9htLyoRER//YkRNg5KFYJiSxdULlA1G1pH0mKKbhUIgGeTpgEZqYjew6HL4fA0aKsig3X2UKXlLaQ9ZbKqBCkEsezhh1ePRLvoNI/ObmLOdNkuogQeCATFOuz//u0ROiAA/QyxvssS1h7ZijPZeZtD7DjFa0wb8ISIGN9phm8MKRfLO2BiVRU7uyX4x9q3v+L7v23GfSvhoQBUIpMON0Hxg+KCZDwz+2j20FVhwdnj/6wkCUgdNWcW+zHQTxQp4mzVUSNBKTUvCtgaUf6IXiI9VmgTCOdwJj8iIlh1y50STkmLDtQgpW2lx2g3idZdgOSznRlOkOPOvroIVTdc6z23gazYrf9NbKzjqQ4DglLxMAiEZUdc0+2thgaaX3r1e3oRaeDCIh/v7EiLBpuCBMP4DhRCyAGptw2AShJ8Rn52J+vAclhcod+Kw+4KFoSIFw0Khos0hYVczp84ugBQlAQog0OC6EyZV2djyPGEUOkhmpC3ESJ6JCrKCCBTzjCVb1NMmk7/uQso7H9M9TtV9BQ8RCVw6kcAhZRgoFnpm7fki85xbrtrYkh5EpGYJpQzWRRWPRH9k9koAg5mCCTzTNmrfLp3USYC8XIl5iIRoWycXn8Kiyza1AIpauu4DK04qIKo31ZrfmD3pP69r0Qk62A1gZtZW1BoahQw5iD0ATP0h++fkTEmRsf9NSNCtPLU41K2n3OfFTW6lsEKm96FVbFC3S1/+Pv/vYyQJSDIXQGrUzGUH8m0x/2lNYBIhnRQ1VbJH7SGX322xNHgd4FR2YgmXAKlSJcVsOX1Xk9OcMhQOZ83x89VCvY8665PG9GfOx8dXYe5d9/JEoQ0wpE0EKN7d1hVe5Zv0ieJd44QP4WJt/bvnMQTfvRl9Fb//ukRPiAA7gvxnspYyh/CBjfZSOdEEVFEa0wb8H5n2L1lg39u63zvHplCutMds1saJFwFJDFYk4yl8jwpjK6W+aCkaarLVKNHRLLdHCg2WPnZniIlPvJwyc4IkwhFSzA3ADDBVdouGGuSpja4eURITjpQAvmS2la5ii5ydIrf7GZ5RLwR4ig6OK08/v7t3b+3qtz+8QyT6qZu5prf8o93ffT3Xu/fEhneAZmffeIkB9hEmCvIxS+kaMHh4fQxh5CeDFJmRraW6KrQq8TXTcQCMbFUvFerRXElxgGR4GpcjbJp9E2sqVx5K8BThEmJEVD4eyacomPpRqsPI4V+MqkRcvTJSzcmIEyeakTOlnHKGzFOptY2UQmNeKDiHPOoSScOAeKFZXXNsrpoTtuFt1tljSElMg8cXIxX9dgOOjUMxBOdxDYShnEQCtc4XJhLNjwtIxrPW9ZllVz5NOFKddDKopLHl2VUxTpBWGVTkLC0kzxSaz90lvO6YLZG4hLmCta2Nqc9Xs1ibpDgZEYjNmStTHDwRIKEgScQYePhQHhGbFXn/VVtp7VN/WjW/7bRtCZMM8sAC4a6iqaIRorEaGUCA0Mgm6SvHc33W4ItYHbl5XGaGcvp1S99eSCXdeSzDKR//u0RNsAA+AvQ+spM3KDyLi/aYN/D6zVEaywzYHRIeK1lg34R9nW11aiWOD3klp01aqUu9YtulKjyyqxR7Dhw/d3yM5e1VbaT/25dyO1vX9i6CHN2qLkq0OSMAHpZp0qku2Ev3/traFwxZE3R7GUNUDsLjnxV3SFg4VbWpqZhw1W0rpiE8arXUOUazLKFUiqpVQnKVoVTIHBQ5iREQURbclUC6PQLxdIukQN5DvhxE02Dl0+xusJsr+NiM8s749xpYjHAQbAB0HhPCBEVPBRYLpWVqYDMm1ND+3QqGh4MGZ3+2ukYk51DxasDpmzqwjWGdXe20QHABMCimzXbxxvJGVQoBI+KaBdCaSHMkqkni3nivR6vLR9c6kQ5dn0PSlJz3GJlU6OzMzMLvZVlNum3cIOk2tTvclb78tLZ100tG3O/S4b43vpHFigCpUFCTDul/1K8Szg7zP/9qJFCKTdETTKWRGuK1p+0zBG0AERu8iTz21GR6NFOCZEKoKmh1xwnFaBcgPjJpxUcs0qnzlqr5jLYZeQkR9HlwI6WbaW3CH1jCki0kWT3G1MZMwJixY8EEyChySgwFTRpAfFheytTBVyGJA8VI+3Q5ZcZJrLI0gOA8wi6W6iI4JI3krUUL6QMWRmblixYJ3yWyQWAGhBBCo4qKQSRFYth9JsV4sYNFC5FFghRkZ2dMKNquYmQrMGheONTlJebc/YgXbA5C8ic/fR50i26DaLF+pL0gR2ScD70r/l7lOMtD61d/Hxg2qe//ukRPAAA9w4ROsvM1B26Ii/aYZsDsi/G+w9KuHWoCH1hI347ca3XfWNIdGEE3hMy9KwGku9/KJrYGWNMOMZogNLQWFcFtBxVYMqi60dNkzJAH11TRZpYHycgbbJ0QZ6E8cgisjA8x7hePE5e6m1bZ15N46FvO1sth7BAQhGo4bjnPA45AoNDz8iVC5wWuWH0uAv/rrRehqV2KOSyREAQSZyZUBIqGSvsG7tu5EkVuBJRrlMKo82bcQP2C0QLEKWtMpI2hcSJCki6sACoZGZoyqAhHUzoFIhhlImE9TIqIAxBINSYEYUeZKmrI7HeXxVQYDdXdzLlJ1bmD7a/jr80rbrNHr8Y/u/vWs/h/5r7/HUvbWmldlEdttjaBEpMFMLFDXtyATqEf2MwC8IsQagEN25HGmEKQwEVScLmDZcFVnojq5xYmXYwq0PTbZXQldkZku50E2IxZUd2gkS5zBDiCEj1XgndarYqQHnuGIilqlk8N8zL88i8sv8/6hXACpVUQICbEIoJ5W/72trrbNtXbXkUcjckljZID1AFQ3QFQajYxQE8NE3z9pIHYMusnXbxpOW6jBGTtDMlv3iOj+AdoGnHrOWiZXqGiMRCeWjrHnmEztV564ydkm/uMqnfevf//u0RN6AA6IyROspM2B8xdhdZSZsT6klDaykbcoQoCF1pg45HF2v2YdYiPIuhd+jLC2nkZYKUoR8u949r0GlLBPKcxgy3u16Hbhk/627/0zbx04hpxuL3xN1Z0d4BlRr/rGkI8AjBHEHE7bAZsxhnqPYJka7jxqS/NCLwjOG4XFYNGGSBs7TU6h0QlESJkkRiwgTBEkAwolUCQ7NVYEWjW5U0MVpu1tJLWZX8/lMxWLhkYJCCAZBwHAw5x5+arei9rQqJaGsQFRENWeayz+xycptI2XHLbI0QI6KwWkGjCz0QBzGMSnk8JAwcGh6mpIoPYH1lIrLtbhonEDJOyeVoNI4AEmmqdEhilxZhEYiOOtCSsKBz6gekixpI/FWgt9oxU+qomSZt+vtXj0XM2WCwpDAv1ntxqmOUn21L/nf8bp9/5hfD3a/bVtMf3jwyO4MzPvrWSBJB5ZD4DfvvuROtP029ouslhRc+xSN9Z1TVcEaE2thgeZa58+cSJSQ8jPNvWbRM7WKOKrLGLI6dAWWmnrQwQa4uxfbUtUGVrP2vRiNUQvPU7X/NiCZynvSMqvPMFHMiY2dGS5oc9q2EiEWqotVsutuEd12saRF8CDA00Jil7ZAGPLmHNzRPBSgEEaDRSbsz4xI1WBUAMjQiZW13tKDqarxpcuQqEc0VpNqhtswyRiBZWy4yvN0sixrTOrudFYUIoLFswgwph0dSOo+W++bZl4+i2kp/gZMqx9Gqwn9tPva78+HfUxb593P91u///ukRPMAA7ktRPs4SMB6xohtaSZsTt0VF+wwb+H5nKH1lI35vSr3fcW3bfWNoWgU1mQvuGlVTpKOw1eUFBSCY97ZLHIqJvuY0AZEgQ69UvraMUuaPtoYCklCktNkBC7SaeLIywjZT4eAAUCu0FEMIhHCdztQkzdqmeZmN/sO3IZVSpbHPPd7DAoWIxsB2jmEQ7K+rp/0xLQ8g7u//0hJFKGJiKswAvbGF0mxySVp+mKUFweeicmsgjhVsPEeFV4uOyUNlGXwIFi4ekgOiiYh0Th9KKs2GaWaWToJtcOzOUQHiA0Fm6swtwhjGpFYRmHZy7n2eZQuF9SDWNFCz2BxyDIHYJggy0S+vFpZOj0PvWiSO6xtEjTKgqfAc62+hrCb80bJ3JLxkSSW013kLm2CvDRhXsu6Jy479qw1stPKGi+SmSmpfQo7Qdpo6UQk4oOi5X9ot92mjJy02QYD18e3pd1vqNiPd/I5QS850JTWtp689ojC5puUaWOgp2Xqkpv3fvm4ZJ9t36zdd+NttvYyQNt6sCLmWdh0MyzhxUrVDQAFb6PQpGhij2HLunVH53ElSYaetTk3PXGWENLW0nXjUh2InFCUHHCCgJBSmZUhKFojAw+dd7KXGOESR9j1m2dh//ukRN0AA4FCxOsJG3B3SAjPZSNvD1jdDa0wzYm4p6L1lI2025n83NSUzfsLJ4/+eeOaSRtudTwjhKp12URuORtIAcf0qSgoLKPDdcNsgdh9wsONV2LtWzHchM+Uyws4WRDEorXTXqrMRF6IeVGDZlSvh7xaPp8RYqZBSy30qYHsM4gDOe2bOHKwdq5oJBqsDh33ay+4R7fOun2EESOrP3TfYcMf7nm77yGTZl98ju8Q4M7P9vGSRxIoUCE8X4aMBr45AipXrWiPJyHp7i1bVZSjiX4nKsp1bR6ZIet29iBVud/suluriZ1I0ShWs95GSzS40xmJnYRMsETu2Y7Yatg+6je2IMNglWBC1+Ml9jDj9ol2D68AoA5CSoRVi1/3t//7/9hzv/Wno0yionI0SBpsQgYnIBTi2UJmE9AtAlUZwDEbWdu3e3DKRXFikW7Vf0qnXURcKEAhfrM1aU6A8hRmps2PXGbBqVSWWUbSXyou1Soxku8C4oNTjtIZGcT2NVhUaZmeFfKo5gwYRB6Bv7570SsK5tVn+7NWHzfM3yfZ0jQzu4IjtvrWSB7ARS4BGySJouQ/NQ6+IUDAwNP7P3yCBgdgGvyxxwTZRQuUkx4DuDzZKITp4Cm3OX52M2aF//u0RNKAA5s1wusmG/J6Jci/ZYZvTzUbCa0kb8nHF6L9kyW9QiQTimIEPSinXlXrWo3VJUuitZymao9kcNNUrA5Ca1I30uY/UW2f+vdBr/3733/XX/+q9VGwwU3JG0ABjRslF7Z14gw1/M+v2ViCQUPU7/KjQQ2CqSGtYwI5qkgjogUNOYmQrIVnlhsUjxjV4dMxi9PRTrGalFjYIRqdK1K5edxZWdtNqn9p+/4d19kKlJkVtBefzQI8hv/Jf2Pzi8mRTtapr9Hu/O2KwrK4KrN/9bGxlEgvgC3564kjdtyZ4RgoLkRjcHOlarSRACwNcjbSTMIUAkEETYkbUIJJB8XbUUicVZXmpTowg0jXNaYgQHtemo+M2cHUEBHSUAEBZc69JMamRq5IE7+ZGRFlk/YvE0zpbxzMyhnMGwZHL/9GhMjjsbctjaRA3FRggeGpDQZ+NRtzFnmkgMO67JO0t1dtC6pqVA2pBBiBAhKkpKRiZo6sSLOU0jWgXfv2bTdIc2SCNNkjd2sjaYbWNheLV5MqSFLgoeo+z7oL3EsyHfZ0oI2Il/BGDmPnCv/MlyNNs2sMrPZc6fkRTuff+e46rcgjktrjRI3NoTivm3tEu/K34pSUAJ2J9kNNLvKJkzg7GaTOWDAaSwkclQGmeElpmUFmAWUzM/a5pqtiaZ8lm5h48IEW+zCtgb48wmxsJ+HkrP9P9tpfssk9IxgnWFCirjLENUwG4eNExE5iHsyN8Rvf9CpuMxpNtxpAAIIBbiXH//ukRPQAA50vQmsmSzJ2ifivZSNuD5GHC6wkb8HOHOG1mRlAafhco9dkFD6AMlWyspUtmZwok2Pq/qvVnyNVQCbCsexqjVulw6rUSsNA0CrizwWAv3lvWe9n/xEr3MKy3KjNOedjiiTkjbRAFgqOiNYnzf2paeFiXWlA4UA2DKLtYGcKEAUqiVVgJdSMKJFQ7cDYTAT2lhEDpUBA8oqEDw4issBgaWCu6WaVJMa7b/WIvWDURCX9mCyMDTYELvDSECoM9YaqTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy4xMDCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//tkROSDMmwlwujvGFBXYrhdJwMKAHgBBKAAACAWgCCUAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sUZOGP8AAAf4AAAAgAAA/wAAABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"

// document.addEventListener("DOMContentLoaded", function () {

//     logMessage("Document is fully loaded!", "info");
//     addVisibilityChangeHandler()


//     audioPlayer.load("join-sound", "https://adhocobjects.s3.ap-south-1.amazonaws.com/videokyc/static/audio/videokyc-join-call.mp3");

//     const playButton = document.getElementById("play-button");
//     const infoMessageEle = document.getElementById("info-message");
//     const counter = document.getElementById("counter");
//     const playAudioContext = document.getElementById("play-audio-context");
//     playButton.onclick = () => {
//         playAudioContext.style.display = 'none'
//         playButton.style.display = "none";
//         infoMessageEle.style.display = "block";
//         infoMessageEle.innerText = `We will play audio on this device after ${playSoundTimer} sec. Please minimize the tab.`;
//         logMessage(`Audio will play in ${playSoundTimer} sec...`, "info");

//         let i = playSoundTimer;
//         playSoundHandler(true);
//         function handler() {
//             counter.style.display = "block";
//             counter.innerText = `Playing audio in ${i} sec...`;
//             logMessage(`Countdown: ${i} sec remaining`, "info");
//             i--;
//             if (i === -1) {
//                 playSoundHandler();
//                 counter.innerText = `Audio play invoked !!!`;
//             }
//             if (i >= 0) {
//                 setTimeout(handler, 1000);
//             }
//         }
//         setTimeout(handler, 1000);
//     };
// });

// sound play using audio context
document.addEventListener("DOMContentLoaded", function () {

    const fakebtn = document.getElementById('fakeAudioButton');
    playAudioContext = document.getElementById("play-audio-context");
    const infoMessageEle = document.getElementById("info-message");
    const counter = document.getElementById("counter");
    const playButton = document.getElementById("play-button");
    const stopButton = document.getElementById("stop-playing")
    delayDropdown = document.getElementById("delay-dropdown");
    audioEle = document.getElementById("audio-ele")
    addAudioHandlers(audioEle)
    delayDropdown.addEventListener("change", onChangeDelayDropdown)
    
    document.body.addEventListener("touchstart", async (event) => {
        clearTimeout(timeoutId)
        playAudioContext.style.display = "none"
        playButton.style.display = "none";
        infoMessageEle.style.display = "block";
        infoMessageEle.innerText = `We will play audio on this device after ${playSoundTimer} sec. Please minimize the tab.`;
        logMessage(`Audio will play in ${playSoundTimer} sec...`, "info");

        let i = playSoundTimer;
        const whiteNoiseStream = whiteNoiseAudio()
        // const ele = new Audio("./videokyc-join-call.mp3")
        // const beepStream = playAudioFromFile(ele, true).stream
        audioEle.srcObject = whiteNoiseStream.stream
        audioEle.play();
        function handler() {
            clearTimeout(timeoutId)
            counter.style.display = "block";
            counter.innerText = `Playing audio in ${i} sec...`;
            logMessage(`Countdown: ${i} sec remaining`, "info");
            i--;

            if (i === -1) {
                // audioEle.pause()
                // audioEle.srcObject = null
                console.log(navigator.mediaSession)
                if ('mediaSession' in navigator) {
                    logMessage("create new media session");
                    navigator.mediaSession.metadata = new MediaMetadata({
                        title: 'VKYC Join Call Sound',
                        artist: 'VKYC App',
                        album: 'Audio Playback Test',
                        artwork: [
                            { src: 'https://images.yourstory.com/cs/images/companies/SocialMediaLogoWHITE-1692612725795.jpg', sizes: '512x512', type: 'image/jpg' } // optional
                        ]
                    });
            
                    navigator.mediaSession.playbackState = 'playing';
                }
                // audioEle.src = "https://adhocobjects.s3.ap-south-1.amazonaws.com/videokyc/static/audio/videokyc-join-call.mp3"
                // audioEle.load();
                // audioEle.loop = true;
                // audioEle.play()
                loadAudioBufferFromURL("/audio/sample-12s.mp3")
                // playAudioContextHandler()

                counter.innerText = `Audio play invoked !!!`;
                console.log(navigator.mediaSession)
                logMessage("Audio play invoked !!!", "info")
            }
            if (i >= 0) {
                timeoutId = setTimeout(handler, 1000);
            }
        }
        timeoutId = setTimeout(handler, 1000);
    });

});


function addAudioHandlers(element){

    element.onplay = () => {
        logMessage("audio element| audio play")
    }
    element.onplaying = () => {
        logMessage("audio element| on playing ele")
    }
    element.onpause = () => {
        logMessage("on pause ele")
    }
    element.onsuspend = () => {
        logMessage("audio element| on suspend ele")
    }
    element.onended = () => {
        logMessage("audio element| play back has ended")
    }
    element.onerror = () => {
        logMessage("audio element| audio ele error")
    }
    element.onwaiting = () => {
        logMessage("audio element| audio ele waiting")
    }
    element.onabort = () => {
        logMessage("audio element| audio ele aborted")
    }
}


function onChangeDelayDropdown(event) {
    const selectedVal = this.value
    playSoundTimer = parseInt(selectedVal)
    console.log(selectedVal)
    playAudioContext.style.display = "block"
    playAudioContext.innerText = `Play sound after ${selectedVal} sec`

}

function logMessage(message, type="info") {
    const logContainer = document.getElementById("log-container");
    const logEntry = document.createElement("div");
    logEntry.classList.add("log-entry");

    if (type === "error") logEntry.classList.add("log-error");
    else if (type === "info") logEntry.classList.add("log-info");
    else logEntry.classList.add("log-debug");

    logEntry.innerText = `[${new Date().toLocaleTimeString()}] ${message}`;
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
}


function playSoundHandler(dummy=false) {
    try {
        audioPlayer.play("join-sound", dummy);
        logMessage("Audio is now playing!", "info");
    } catch (error) {
        logMessage("Error playing audio: " + error.message, "error");
    }
}

function playAudioContextHandler(dummy=false) {
    try {
        // audioContextPlayer.play("join-sound", dummy);
        returnBeep()
        logMessage("Audio context is now playing!", "info");
    } catch (error) {
        logMessage("Error playing audio context: " + error.message, "error");
    }
}

function addVisibilityChangeHandler() {
    document.onvisibilitychange = () => {
        logMessage(`Visibility State is ${document.visibilityState}`);
    }
}

document.getElementById("copy-logs-btn").addEventListener("click", function () {
    const logContainer = document.getElementById("log-container");
    const logs = logContainer.innerText.trim();
    const copyBtn = this;

    if (!logs) {
        copyBtn.textContent = "⚠️ No logs!";
        setTimeout(() => {
            copyBtn.textContent = "📋 Copy Logs";
        }, 2000);
        return;
    }

    navigator.clipboard.writeText(logs).then(() => {
        copyBtn.textContent = "✅ Copied!";
        setTimeout(() => {
            copyBtn.textContent = "📋 Copy Logs";
        }, 2000);
    }).catch(err => {
        console.error("Copy failed:", err);
        copyBtn.textContent = "❌ Failed";
        setTimeout(() => {
            copyBtn.textContent = "📋 Copy Logs";
        }, 2000);
    });
});

window.onload = function () {
    const fakebtn = document.getElementById('fakeAudioButton');

    // Wait a bit just to ensure DOM is ready
    setTimeout(() => {
        console.log("here")
        fakebtn.click(); // Simulated user gesture
    }, 100);
    const userAgent = navigator.userAgent;
    const userAgentTextElem = document.getElementById("user-agent-text");
    const copyButton = document.getElementById("copy-user-agent");

    userAgentTextElem.textContent = userAgent;

    copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(userAgent)
            .then(() => {
                copyButton.textContent = "✅";
                setTimeout(() => {
                    copyButton.textContent = "📋";
                }, 1500);
            })
            .catch(err => {
                console.error("Failed to copy user agent: ", err);
            });
    });
};
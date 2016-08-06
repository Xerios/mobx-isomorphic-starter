import mobx from "mobx"

// Required for client side title and description change, you can add more
//-----------
export default (state) => mobx.autorun(()=>{
    document.title = state.app.title
    document.querySelector("meta[name='description']").content = state.app.description
})
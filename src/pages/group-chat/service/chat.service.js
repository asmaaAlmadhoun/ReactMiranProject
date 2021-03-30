import { CometChat } from "@cometchat-pro/chat";
import config from "../../../config";
import Translator
    from "../chat-component/cometchat-pro-react-ui-kit/CometChatWorkspace/src/resources/localization/translator";
export  class  ChatService  {
    constructor(listenId ) {
        if(listenId === undefined){
            listenId = localStorage.getItem('ChatServiceID');
        }
        this.listenToLogin(listenId)
    }
    static LISTENER_KEY_MESSAGE = "msgListener";
    static appId = config.appId;
    static apiKey = config.apiKey;
    static LISTENER_KEY_GROUP = "groupListener";
    static async init() {
        return await CometChat.init(ChatService.appId);
    }
    /**
    * @Param {userId} represent user id in chat, {required}
     * @Param {username} is  {required}
     * @Purpose { Create User for chat ... }
    **/
    createUser  =  async ({userId , userName ,role , avatar, metadata } ) => {

        await ChatService.init()
        const user = new CometChat.User({uid:userId, name:userName , role, avatar , metadata});

        return await CometChat.createUser(user,ChatService.apiKey);
    }

    getAuthToken = async (uid) => {
        const apiKEY =  ChatService.apiKey;
        debugger;
        return await CometChat.login(uid ,apiKEY);
    }

    login = async (authToken) => {
        if(authToken === undefined){
            authToken = localStorage.getItem('ChatServiceAuthToken')
        }
        return await  CometChat.login(authToken);
    }

    getCurrentUser = async () => {
        return await CometChat.getLoggedinUser();
    }
    /**
     * @Param {msg}  maybe text | media | custom Message.
     * @Return {Promise};
    * */
    sendMessage = async (msg) => {

        return await CometChat.sendMessage(msg);
    }




    fetchAllUsers =  async (limit , ids) => {
        let usersRequest = new CometChat.UsersRequestBuilder()
            .setLimit(50)
            .setStatus(CometChat.USER_STATUS.ONLINE)
            .friendsOnly(false)
            .setRole('trainee')
            .hideBlockedUsers(true)
            .build();
       const userList = await  usersRequest.fetchNext();
       console.log('users');
       console.log(userList);

    }

    fetchSpecificUsers = async (userIds) => {
        debugger;
        if(userIds && userIds.length > 0) {
            const users  = [];
            userIds.forEach(id => {

                CometChat.getUser(id + "_t").then(user => {
                    users.push(user);
                });
            })

            return users;
        }

    }


    getSpecificUSer = async (uid) => {
       return  await CometChat.getUser(uid);
    }
    listenToLogin = (listenerId) => {
        CometChat.addLoginListener(listenerId , {loginSuccess : () => {
         console.log('listenerId '+listenerId);
           alert("Login success")
            } , loginFailure: () => {
          //  alert('login failed')
            }})
    }
}
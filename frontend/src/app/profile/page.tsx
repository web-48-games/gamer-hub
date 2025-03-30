import {PlayerCard} from "@/app/components/PlayerCard";
import {Player} from "@/app/components/PlayerCard"


export default function () {
    let playerInfo : Player = {
        name: 'Rock Howard',
        avatarUrl: '/window.svg',
        gamesPlayed: 27,
        createdAt: '4/21/2018',
        gamesLiked: 15,
        email: 'notme@cnm.edu',
        aboutMe: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat laoreet laoreet. Integer rhoncus, nunc nec finibus fringilla, ipsum velit ullamcorper diam, sed venenatis nibh est eget quam. Sed auctor metus in rutrum varius. Vestibulum iaculis rhoncus enim at ultrices. Praesent mollis metus dignissim, accumsan nibh non, tempor erat. Donec est arcu, ultricies quis magna ac, tempus euismod libero. Morbi nulla purus, lobortis sit amet posuere sit amet, hendrerit sit amet magna. Vivamus mollis tristique nisl in viverra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt metus id purus luctus consectetur. Fusce vel tincidunt orci. Maecenas vel volutpat sapien. Cras in arcu quis erat mattis mattis nec quis dolor. Ut faucibus egestas diam, ut rutrum nisl. Cras eget urna ex.\n' +
            '\n' +
            '                    Aenean luctus ornare mollis. Etiam ac bibendum nulla. Quisque quis sem vitae sapien aliquam gravida nec et diam. Maecenas porta velit sit amet ipsum pulvinar maximus. Donec a sollicitudin quam. Duis porta porta elit, id auctor felis rhoncus nec. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed euismod posuere metus et tincidunt. Etiam diam nibh, fringilla ut varius semper, commodo vel est. Cras tristique tristique lacus, non congue urna. Duis pulvinar ex dolor, sed bibendum arcu lacinia et. Cras consectetur, diam ut placerat dictum, ipsum ligula luctus libero, eget dictum odio lacus vitae odio. In hac habitasse platea dictumst. Vivamus suscipit felis enim. Quisque et tellus non ligula gravida pretium ac sit amet odio. Donec ultrices porta sodales.\n' +
            '\n' +
            '                    Vivamus rhoncus, diam sed semper fermentum, elit orci imperdiet ex, eu rutrum turpis ligula id libero. Mauris scelerisque urna eros, at egestas turpis fringilla sit amet. Proin aliquet laoreet erat ac suscipit. Fusce a purus eleifend, fringilla dui vitae, consectetur ligula. Ut mollis felis diam, in molestie ex facilisis ut. Praesent at vulputate nisi. Vivamus nulla augue, ornare nec lorem ut, tempus maximus nisi. Nunc quis neque cursus, egestas neque et, volutpat felis. In ultrices pellentesque turpis vel ullamcorper. Integer et mattis neque, quis porta tortor. Quisque bibendum, felis vel mollis sagittis, augue massa posuere neque, vitae tincidunt metus nisl nec tellus.\n' +
            '\n' +
            '                    Sed vehicula dui a dolor mollis, eu venenatis nibh volutpat. Phasellus id dolor vel est ultricies fermentum. Ut rutrum sem elit, non ullamcorper leo accumsan tincidunt. Phasellus rhoncus mauris lacus, in placerat metus laoreet ut. Nulla commodo, ante nec lobortis porttitor, justo mauris aliquam dolor, vel commodo quam mauris mollis dui. Praesent elementum ex a iaculis sagittis. Nam eget venenatis nisi. Donec ultrices mauris elit, et rhoncus diam maximus vitae. Ut lobortis metus at nibh ornare fermentum. Proin sit amet ante fermentum, consectetur lectus eget, fringilla lacus. Vivamus sagittis tincidunt est sed rhoncus. Sed pharetra tempus mi nec mollis. Aliquam sed dui id felis malesuada mattis vitae pellentesque eros. Integer mauris lectus, rhoncus ut quam et, rutrum bibendum velit. Aenean non nulla erat.\n' +
            '\n' +
            '                    Morbi tempus tellus non imperdiet volutpat. Donec et tortor at enim finibus interdum quis mattis lacus. Proin eu ex lacinia, elementum ligula lobortis, sagittis tortor. Nulla sodales cursus bibendum.'
    }

    return (
        <>
            <div className="container flex flex-col items-center mx-auto ">
                <PlayerCard player = {playerInfo}/>
            </div>
        </>
    )
}
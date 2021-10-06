var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/mmajdanski/svelte-todo.git', // Update to point to your repository  
        user: {
            name: 'Michael Majdanski', // update to use your name
            email: 'michael.majdanski@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)
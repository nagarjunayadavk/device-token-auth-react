Rails.application.config.middleware.use OmniAuth::Builder do
    # provider :github,        ENV['GITHUB_KEY'],   ENV['GITHUB_SECRET'],   scope: 'email,profile'
    provider :github,  'f9af2e6df3f9e55b37ca', 'ee6c542a3dae4eb5c047914da570d5f2212f81b2',   scope: 'email,profile'
    # provider :facebook,      ENV['FACEBOOK_KEY'], ENV['FACEBOOK_SECRET']
    provider :facebook, '973768456388872','66575710272ec07c1b87d74d488ec3c1'
    # provider :google_oauth2, ENV['GOOGLE_KEY'],   ENV['GOOGLE_SECRET']
    provider :google_oauth2, '346203289771-t453qp83d0umia3kvggjr1eb5m1cllb5.apps.googleusercontent.com', 'GrAsiRFHnb7kDZuy59g-7bDO'
  end
require 'test_helper'

class CommnetsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get commnets_index_url
    assert_response :success
  end

end
